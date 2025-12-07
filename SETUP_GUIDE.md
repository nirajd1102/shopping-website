# Complete Setup Guide

Follow these steps to get your fashion shopping website up and running.

## Step 1: Install Node.js

Download and install Node.js 18 or higher from [nodejs.org](https://nodejs.org/)

## Step 2: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

## Step 3: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Wait for the project to be set up (takes 1-2 minutes)

## Step 4: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open the file `lib/supabase-schema.sql` from this project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

## Step 5: Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (long string, keep this secret!)

## Step 6: Configure Environment Variables

1. In the project root, create a file named `.env.local`
2. Copy this template and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ADMIN_EMAIL=admin@fashionstore.com
ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

**Important:**
- Replace `919876543210` with your WhatsApp Business number
- Format: Country code + number (no +, no spaces, no dashes)
- Example: For India +91 9876543210, use `919876543210`
- Example: For USA +1 5551234567, use `15551234567`

## Step 7: Run the Website

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

## Step 8: Access Admin Portal

1. Go to: **http://localhost:3000/admin**
2. Login with:
   - Email: The email you set in `ADMIN_EMAIL`
   - Password: The password you set in `ADMIN_PASSWORD`

## Step 9: Add Your First Products

1. In Admin Portal, go to **Categories** tab
2. Click **Add Category**
3. Create categories like: "Kurta", "T-Shirt", "Pants"
4. Go to **Products** tab
5. Click **Add Product**
6. Fill in product details:
   - Name, Description, Price
   - Select Category
   - Add Image URLs (you can use image hosting services like Imgur, Cloudinary, etc.)
   - Set Stock Quantity
   - Click **Create Product**

## Step 10: Test WhatsApp Ordering

1. Go to homepage
2. Click on any product
3. Click **Buy Now via WhatsApp**
4. It should open WhatsApp with a pre-filled message
5. Send the message to test

## Troubleshooting

### "Failed to load products"
- Check your Supabase URL and keys in `.env.local`
- Make sure you ran the SQL schema in Supabase
- Check Supabase dashboard → Table Editor to see if tables exist

### "Cannot connect to Supabase"
- Verify your internet connection
- Check if Supabase project is active (not paused)
- Verify the URL format is correct

### WhatsApp not opening
- Check `NEXT_PUBLIC_WHATSAPP_NUMBER` format
- Make sure it's only digits (no +, spaces, or dashes)
- Test with a valid WhatsApp number

### Admin login not working
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Make sure you're using the exact values (case-sensitive)
- Restart the dev server after changing `.env.local`

### Images not showing
- Make sure image URLs are publicly accessible
- Use HTTPS URLs
- Test the image URL in a browser first

## Next Steps

1. **Add Real Product Images**: Upload images to a hosting service (Imgur, Cloudinary, Supabase Storage) and use those URLs
2. **Customize Branding**: Edit colors in `tailwind.config.js`
3. **Add More Products**: Use the admin portal to build your catalog
4. **Deploy to Production**: Use Vercel, Netlify, or Railway for hosting

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables in Production

Make sure to add all variables from `.env.local` to your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Supabase logs in dashboard
3. Verify all environment variables are set correctly
4. Make sure database tables exist

---

**You're all set! Start adding products and grow your fashion business! 🎉**

