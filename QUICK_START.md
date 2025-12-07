# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL from `lib/supabase-schema.sql` in Supabase SQL Editor

### 3. Configure Environment
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=admin@yourstore.com
ADMIN_PASSWORD=your_password
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### 4. Run Website
```bash
npm run dev
```

Visit: http://localhost:3000
Admin: http://localhost:3000/admin

## 📱 WhatsApp Number Format

- **India**: `919876543210` (for +91 9876543210)
- **USA**: `15551234567` (for +1 5551234567)
- **UK**: `447911123456` (for +44 7911123456)

**Important**: No +, spaces, or dashes - only digits!

## 🖼️ Adding Product Images

You need to host images somewhere and use URLs. Options:

1. **Imgur** (Free)
   - Upload at imgur.com
   - Copy direct image link
   - Use in product form

2. **Cloudinary** (Free tier)
   - Sign up at cloudinary.com
   - Upload images
   - Get image URLs

3. **Supabase Storage** (Recommended for production)
   - Set up storage bucket in Supabase
   - Upload via admin panel (requires additional setup)

## 🎯 First Steps After Setup

1. ✅ Login to Admin Portal (`/admin`)
2. ✅ Create Categories (Kurta, T-Shirt, Pants)
3. ✅ Add Products with images
4. ✅ Mark some products as Trending
5. ✅ Test WhatsApp ordering

## 📚 Full Documentation

See `README.md` and `SETUP_GUIDE.md` for detailed instructions.

---

**Need Help?** Check the troubleshooting section in `SETUP_GUIDE.md`

