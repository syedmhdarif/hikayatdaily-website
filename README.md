# Hikayat Daily Website

Official website for Hikayat Daily - a mindful reading companion app.

## 🌐 Live Site
- **Production:** https://hikayatdaily.com
- **GitHub Pages:** Deployed from `main` branch

## 📁 Project Structure

```
hikayatdaily-website/
├── index.html                    # Landing page
├── privacy-policy.html           # Privacy policy
├── terms-of-service.html         # Terms of service
├── delete-account.html           # Account deletion instructions
├── CNAME                          # Domain configuration
├── .well-known/
│   └── assetlinks.json           # Android App Links verification
├── DEEP_LINKING_SETUP.md         # Deep linking implementation guide
└── README.md                      # This file
```

## 🚀 Deployment

This site is deployed via **GitHub Pages**.

### Setup Steps:
1. Push changes to the `main` branch
2. GitHub Pages automatically deploys from root directory
3. Domain `hikayatdaily.com` is configured via CNAME file

### Verify Deployment:
```bash
# Check if site is live
curl -I https://hikayatdaily.com

# Verify assetlinks.json is accessible
curl https://hikayatdaily.com/.well-known/assetlinks.json
```

## 🔗 Deep Linking (Android App Links)

The `.well-known/assetlinks.json` file enables Android App Links, allowing URLs like `hikayatdaily.com/article/123` to open directly in the app.

### Current Status:
- ✅ assetlinks.json structure created
- ⏳ Pending: Replace placeholder SHA256 fingerprint with actual app signing key
- ⏳ Pending: Configure Android manifest with intent filters

**See [DEEP_LINKING_SETUP.md](DEEP_LINKING_SETUP.md) for complete implementation guide.**

## 📝 Pages

### Landing Page (`index.html`)
- Hero section with app description
- Email waitlist CTA
- Links to policy pages
- Responsive design with custom typography

### Privacy Policy (`privacy-policy.html`)
- Data collection and usage policies
- User rights and choices
- Contact information

### Terms of Service (`terms-of-service.html`)
- Account terms
- Acceptable use policy
- Content ownership
- Disclaimers

### Delete Account (`delete-account.html`)
- In-app deletion instructions
- Email-based deletion process
- Data deletion details
- Processing timeline

## 🎨 Design System

### Colors
- **Background:** `#f5f0ec`
- **Surface:** `#ffffff`
- **Primary:** `#3b3a7a`
- **Accent:** `#f5c15d`
- **Text:** `#211f26`
- **Muted:** `#6f6b78`

### Typography
- **Headings:** Playfair Display
- **Body:** DM Sans

## 🔧 Local Development

```bash
# Clone repository
git clone https://github.com/syedmhdarif/hikayatdaily-website.git
cd hikayatdaily-website

# Open in browser (no build step required)
open index.html

# Or use a local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

## 📱 App Links Testing

After deploying and configuring the app:

```bash
# Verify domain association
adb shell pm get-app-links com.hikayatdailyglobal

# Test deep link
adb shell am start -a android.intent.action.VIEW \
  -d "https://hikayatdaily.com/article/123"
```

## 🗺️ Implementation Roadmap

### Phase 1: Pre-Launch (Current)
- ✅ Basic website structure
- ✅ Privacy policy, terms, delete account pages
- ✅ Domain configuration (CNAME)
- ✅ assetlinks.json placeholder

### Phase 2: Post-Launch
- 🔜 Update assetlinks.json with release SHA256
- 🔜 Configure Android manifest
- 🔜 Implement deep link handling in app
- 🔜 Test App Links thoroughly

### Phase 3: Enhancement
- 🔜 Add iOS Universal Links support
- 🔜 Deep link analytics
- 🔜 Dynamic link parameters for marketing campaigns
- 🔜 SEO optimization

## 📧 Contact

- **Email:** hello@hikayatdaily.com
- **Privacy:** privacy@hikayatdaily.com
- **Support:** hikayatdaily.app@gmail.com

## 📄 License

© 2024-2025 Hikayat Daily. All rights reserved.

---

**Made with intention in Southeast Asia.**
