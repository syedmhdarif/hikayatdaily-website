# Deep Linking Setup Guide for Hikayat Daily

## Overview
Android App Links allow `hikayatdaily.com` URLs to open directly in your app when installed, or fall back to the website when not installed.

## Current Status
✅ Website structure ready (privacy policy, terms, delete account)  
✅ `.well-known/assetlinks.json` created with placeholder  
🔜 Pending: SHA256 fingerprint + Android manifest configuration

---

## Step 1: Get Your SHA256 Fingerprint

### For Release Build (Production)
```bash
keytool -list -v -keystore /path/to/your/release.keystore -alias your-key-alias
```

### For Debug Build (Testing)
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Look for the **SHA256** line in the output:
```
SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90
```

Remove the colons and use uppercase:
```
ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890
```

---

## Step 2: Update assetlinks.json

Replace the placeholder in `.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.hikayatdailyglobal",
    "sha256_cert_fingerprints": [
      "YOUR_ACTUAL_SHA256_FINGERPRINT_HERE"
    ]
  }
}]
```

**Important:** You can add multiple fingerprints (debug + release):
```json
"sha256_cert_fingerprints": [
  "DEBUG_SHA256_FINGERPRINT",
  "RELEASE_SHA256_FINGERPRINT"
]
```

---

## Step 3: Update Android Manifest

Add this to your `AndroidManifest.xml` inside the main `<activity>` tag:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true">
    
    <!-- Existing intent filters -->
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

    <!-- Add this for App Links -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <!-- Handle hikayatdaily.com URLs -->
        <data
            android:scheme="https"
            android:host="hikayatdaily.com" />
        <data
            android:scheme="https"
            android:host="www.hikayatdaily.com" />
    </intent-filter>
</activity>
```

---

## Step 4: Handle Deep Links in Your App

### React Native Example
```javascript
import { Linking } from 'react-native';

useEffect(() => {
  // Handle initial URL (app opened from link)
  Linking.getInitialURL().then(url => {
    if (url) {
      handleDeepLink(url);
    }
  });

  // Handle URL when app is already open
  const subscription = Linking.addEventListener('url', ({ url }) => {
    handleDeepLink(url);
  });

  return () => subscription.remove();
}, []);

function handleDeepLink(url) {
  // Example: https://hikayatdaily.com/article/123
  const route = url.replace(/.*?:\/\//g, ''); // Remove scheme
  const parts = route.split('/');
  
  if (parts[1] === 'article' && parts[2]) {
    // Navigate to article screen
    navigation.navigate('Article', { id: parts[2] });
  }
}
```

### Flutter Example
```dart
import 'package:uni_links/uni_links.dart';

void initDeepLinks() async {
  // Handle initial link
  try {
    final initialLink = await getInitialLink();
    if (initialLink != null) {
      _handleDeepLink(initialLink);
    }
  } catch (e) {
    print('Failed to get initial link: $e');
  }

  // Handle links while app is running
  linkStream.listen((String? link) {
    if (link != null) {
      _handleDeepLink(link);
    }
  });
}

void _handleDeepLink(String link) {
  final uri = Uri.parse(link);
  if (uri.pathSegments.length >= 2 && uri.pathSegments[0] == 'article') {
    final articleId = uri.pathSegments[1];
    // Navigate to article
    Navigator.pushNamed(context, '/article', arguments: articleId);
  }
}
```

---

## Step 5: Deploy & Test

### Deploy Website
1. Push changes to GitHub
2. Ensure GitHub Pages is enabled
3. Verify `https://hikayatdaily.com/.well-known/assetlinks.json` is accessible

### Test App Links
```bash
# Test if Android recognizes your domain
adb shell pm get-app-links com.hikayatdailyglobal

# Verify domain association
adb shell pm verify-app-links --re-verify com.hikayatdailyglobal

# Test deep link manually
adb shell am start -a android.intent.action.VIEW -d "https://hikayatdaily.com/article/123"
```

### Verify in Browser
Use Google's Statement List Generator and Tester:
https://developers.google.com/digital-asset-links/tools/generator

---

## Common URL Patterns to Handle

```
https://hikayatdaily.com/                    → Home screen
https://hikayatdaily.com/article/123         → Article detail
https://hikayatdaily.com/privacy-policy      → Privacy policy (can open in-app or browser)
https://hikayatdaily.com/terms-of-service    → Terms (can open in-app or browser)
https://hikayatdaily.com/delete-account      → Account deletion flow
```

---

## Troubleshooting

### Links not opening in app?
1. Check `assetlinks.json` is accessible at `https://hikayatdaily.com/.well-known/assetlinks.json`
2. Verify SHA256 fingerprint matches your app signing key
3. Ensure `android:autoVerify="true"` is set in manifest
4. Clear app data and reinstall
5. Check Android version (App Links require Android 6.0+)

### Testing on emulator?
Use the debug keystore SHA256 fingerprint for testing.

---

## iOS Universal Links (Future)

For iOS support, you'll need to add `.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAM_ID.com.hikayatdailyglobal",
        "paths": ["*"]
      }
    ]
  }
}
```

---

## Timeline Recommendation

**Now (Pre-Launch):**
- ✅ Basic website structure
- ✅ assetlinks.json placeholder created
- ✅ CNAME configured

**After App Published:**
- 🔜 Get release SHA256 fingerprint
- 🔜 Update assetlinks.json with real fingerprint
- 🔜 Add intent filters to Android manifest
- 🔜 Implement deep link handling in app code
- 🔜 Test thoroughly before announcing

**Post-Launch Enhancement:**
- 🔜 Add iOS Universal Links support
- 🔜 Track deep link analytics
- 🔜 Add dynamic link parameters for campaigns

---

## Questions?
Email: hello@hikayatdaily.com
