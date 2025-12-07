# 🚀 Complete Step-by-Step Setup Guide

## PART 1: Install Dependencies & Open Website First

### Step 1: Install Node.js (if not installed)
1. Go to https://nodejs.org/
2. Download the LTS version (v18 or higher)
3. Install it
4. Open a new terminal/PowerShell window

### Step 2: Install Project Dependencies
Open PowerShell or Terminal in your project folder and run:

```bash
npm install
```

**Wait for it to finish** (takes 2-5 minutes)

### Step 3: Create Temporary Environment File
Create a file named `.env.local` in the project root with this content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
SUPABASE_SERVICE_ROLE_KEY=placeholder_key
ADMIN_EMAIL=admin@fashionstore.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### Step 4: Run the Website
```bash
npm run dev
```

You should see: `Ready - started server on 0.0.0.0:3000`

### Step 5: Open in Browser
Go to: **http://localhost:3000**

You'll see the website, but it won't load products yet (that's normal - we'll fix that next!)

---

## PART 2: Supabase Setup (Step-by-Step)

### Step 1: Create Supabase Account

1. **Go to Supabase Website**
   - Open browser: https://supabase.com
   - Click **"Start your project"** or **"Sign Up"**

2. **Sign Up Options**
   - Choose: Sign up with GitHub (recommended) OR Email
   - If GitHub: Click "Continue with GitHub" and authorize
   - If Email: Enter email, password, and verify email

3. **Complete Profile**
   - Enter your name
   - Click **"Create Account"** or **"Continue"**

### Step 2: Create New Project

1. **Click "New Project"** button (usually top right or on dashboard)

2. **Fill Project Details:**
   - **Name**: `fashion-store` (or any name you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
     - Example: `MyFashionStore2024!`
     - **IMPORTANT**: Write this down - you'll need it!
   - **Region**: Choose closest to you
     - Examples: `Southeast Asia (Singapore)`, `US East (North Virginia)`, etc.
   - **Pricing Plan**: Select **"Free"** (good for starting)

3. **Click "Create new project"**

4. **Wait for Setup** (takes 1-3 minutes)
   - You'll see "Setting up your project..."
   - Wait until you see "Project is ready" or the dashboard loads

### Step 3: Get Your Supabase Credentials

1. **In Supabase Dashboard**, look at the left sidebar

2. **Click on "Settings"** (gear icon at bottom)

3. **Click on "API"** (under Project Settings)

4. **You'll see three important values:**

   **a) Project URL:**
   - Looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - Click the copy icon next to it
   - This is your `NEXT_PUBLIC_SUPABASE_URL`

   **b) anon public key:**
   - Long string starting with `eyJ...`
   - Click the copy icon next to "anon public"
   - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   **c) service_role key:**
   - Long string starting with `eyJ...`
   - Click the "Reveal" button to show it
   - Click the copy icon
   - This is your `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ **KEEP THIS SECRET!** Don't share it publicly

### Step 4: Set Up Database Tables

1. **In Supabase Dashboard**, click **"SQL Editor"** in left sidebar

2. **Click "New Query"** button (top right)

3. **Open the file** `lib/supabase-schema.sql` from your project

4. **Copy ALL the SQL code** from that file (Ctrl+A, Ctrl+C)

5. **Paste it into the Supabase SQL Editor** (the big text box)

6. **Click "Run"** button (or press Ctrl+Enter)

7. **You should see:**
   - Green checkmark ✅
   - Message: "Success. No rows returned"
   - Or: "Success" with some table creation messages

8. **Verify Tables Created:**
   - Click **"Table Editor"** in left sidebar
   - You should see these tables:
     - ✅ categories
     - ✅ products
     - ✅ discount_coupons
     - ✅ orders
     - ✅ admin_users

### Step 5: Update Environment File

1. **Open `.env.local` file** in your project

2. **Replace the placeholder values** with your real Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQwMTIzNDU2LCJleHAiOjE5NTU3ODk0NTZ9.your-actual-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2NDAxMjM0NTYsImV4cCI6MTk1NTc4OTQ1Nn0.your-actual-service-key-here
ADMIN_EMAIL=admin@fashionstore.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

**Replace:**
- `https://your-actual-project-id.supabase.co` → Your actual Project URL
- `eyJhbGc...` (anon key) → Your actual anon public key
- `eyJhbGc...` (service key) → Your actual service_role key
- `919876543210` → Your WhatsApp Business number (digits only, no + or spaces)

### Step 6: Restart the Website

1. **Stop the server** (if running):
   - Go to terminal where `npm run dev` is running
   - Press `Ctrl + C`

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Refresh your browser** at http://localhost:3000

4. **The website should now work!** 🎉

---

## PART 3: Test Everything

### Test 1: Homepage
- Go to http://localhost:3000
- Should see the homepage (may show "No products" - that's OK!)

### Test 2: Admin Portal
1. Go to http://localhost:3000/admin
2. Login with:
   - Email: `admin@fashionstore.com`
   - Password: `admin123`
3. Should see the admin dashboard

### Test 3: Add Your First Product
1. In Admin Portal, click **"Categories"** tab
2. Click **"Add Category"**
3. Enter:
   - Name: `Kurta`
   - Click **"Create"**
4. Click **"Products"** tab
5. Click **"Add Product"**
6. Fill in:
   - Name: `Test Kurta`
   - Price: `999`
   - Category: Select "Kurta"
   - Stock: `10`
   - Image URL: `https://via.placeholder.com/400x400?text=Test+Product`
   - Click **"Create Product"**
7. Go back to homepage - you should see your product!

---

## Troubleshooting

### ❌ "Failed to load products"
- Check `.env.local` file has correct Supabase URL and keys
- Make sure you ran the SQL schema in Supabase
- Restart the dev server (Ctrl+C, then `npm run dev`)

### ❌ "Cannot connect to Supabase"
- Check internet connection
- Verify Supabase project is not paused
- Double-check the URL format (should end with `.supabase.co`)

### ❌ "Tables not found"
- Go back to Supabase SQL Editor
- Run the SQL schema again
- Check Table Editor to verify tables exist

### ❌ Admin login not working
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Make sure they match exactly (case-sensitive)
- Restart dev server after changing `.env.local`

---

## ✅ You're Done!

Your website is now fully set up and ready to use!

**Next Steps:**
1. Add more categories (Kurta, T-Shirt, Pants)
2. Add products with real images
3. Mark some products as "Trending"
4. Test WhatsApp ordering
5. Start selling! 🎉

---

**Need Help?** 
- Check Supabase dashboard for any error messages
- Verify all environment variables are set correctly
- Make sure database tables exist in Table Editor

