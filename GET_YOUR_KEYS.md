# 🔑 How to Get Your Supabase API Keys

You already have your Supabase URL: `https://cggvjgpjxqhwpindwuzd.supabase.co`

Now you need to get your API keys:

## Step 1: Go to Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Login to your account
3. Click on your project (the one with URL: `cggvjgpjxqhwpindwuzd`)

## Step 2: Get Your API Keys

1. **Click "Settings"** (gear icon at bottom left)
2. **Click "API"** (under Project Settings)
3. You'll see a page with your API keys

## Step 3: Copy These Values

### 1. Project URL (You already have this!)
```
https://cggvjgpjxqhwpindwuzd.supabase.co
```

### 2. anon public key
- Look for **"anon public"** section
- Click the **copy icon** 📋 next to it
- This is a long string starting with `eyJ...`
- This goes in: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. service_role key
- Look for **"service_role"** section  
- Click **"Reveal"** button to show it
- Click the **copy icon** 📋 next to it
- This is a long string starting with `eyJ...`
- ⚠️ **KEEP THIS SECRET!** Don't share it publicly
- This goes in: `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Create .env.local File

1. In your project folder, create a file named `.env.local`
2. Copy this template and paste your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://cggvjgpjxqhwpindwuzd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here
ADMIN_EMAIL=admin@fashionstore.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

3. Replace:
   - `paste_your_anon_key_here` → Your actual anon public key
   - `paste_your_service_role_key_here` → Your actual service_role key
   - `919876543210` → Your WhatsApp Business number

## Step 5: Run Database Setup

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open file `SUPABASE_SQL_CODE.sql` from your project
4. Copy ALL the code
5. Paste into Supabase SQL Editor
6. Click **Run** button
7. You should see: ✅ "Success"

## Step 6: Test Your Website

1. Make sure `.env.local` file is created with all values
2. Run: `npm run dev`
3. Open: http://localhost:3000
4. Go to: http://localhost:3000/admin
5. Login and start adding products!

---

**Need Help?**
- Make sure you copied the ENTIRE key (they're very long!)
- Keys should start with `eyJ`
- Don't include quotes around the keys in .env.local

