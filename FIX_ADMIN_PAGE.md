# 🔧 Fix Admin Page Not Loading

## The Problem:
Admin page shows blank or doesn't load because environment variables aren't set correctly.

## Quick Fix:

### Step 1: Create `.env.local` File

1. In your project folder, create a file named `.env.local`
2. Copy this content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://cggvjgpjxqhwpindwuzd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_ADMIN_EMAIL=admin@fashionstore.com
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

**Important:** 
- For now, you can use placeholder keys: `placeholder_key` 
- The admin login will still work with default credentials
- You'll need real Supabase keys to load products

### Step 2: Restart Dev Server

1. Stop the server: Press `Ctrl + C` in terminal
2. Start again: `npm run dev`
3. Open: http://localhost:3000/admin

### Step 3: Login

Use these credentials:
- **Email:** `admin@fashionstore.com`
- **Password:** `admin123`

## If Still Not Working:

1. **Check browser console** (F12) for errors
2. **Make sure `.env.local` file exists** in project root
3. **Restart the dev server** after creating/updating `.env.local`
4. **Clear browser cache** or try incognito mode

## To Get Real Supabase Keys (for products to work):

1. Go to: https://supabase.com/dashboard
2. Click your project
3. Settings → API
4. Copy:
   - **anon public** key → Replace `your_anon_key_here`
   - **service_role** key → Replace `your_service_role_key_here`

## Test Admin Page:

1. Go to: http://localhost:3000/admin
2. You should see login form
3. Login with: `admin@fashionstore.com` / `admin123`
4. Should see admin dashboard

