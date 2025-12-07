# 🚀 Quick Deploy Guide - Follow These Steps

## ✅ STEP 1: DONE - Code is committed locally

## 📤 STEP 2: Create GitHub Repository

1. **Open your browser** and go to: https://github.com/new
2. **Repository name**: `shopping-website` (or any name)
3. **Description**: "Fashion Shopping Website"
4. **Choose**: Public or Private
5. **IMPORTANT**: Do NOT check "Add a README file"
6. Click **"Create repository"**

## 📤 STEP 3: Push to GitHub

After creating the repo, GitHub will show you commands. **Copy and run these in your terminal:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/shopping-website.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

If you get an error about authentication, you may need to:
- Use a Personal Access Token instead of password
- Or use GitHub Desktop app

## 🌐 STEP 4: Deploy to Netlify

### A. Go to Netlify
Visit: https://app.netlify.com

### B. Sign Up/Login
- Click "Sign up" or "Log in"
- Choose **"Continue with GitHub"** (easiest option)

### C. Import Your Site
1. Click **"Add new site"** → **"Import an existing project"**
2. Click **"Deploy with GitHub"**
3. Authorize Netlify (if asked)
4. Find your `shopping-website` repository
5. Click on it to select
6. Click **"Next"**

### D. Build Settings (Usually auto-detected)
- Build command: `npm run build`
- Publish directory: `.next` (or leave default)
- Click **"Show advanced"**

### E. Environment Variables (VERY IMPORTANT!)

Click **"New variable"** and add these **ONE BY ONE**:

```
Variable: NEXT_PUBLIC_SUPABASE_URL
Value: (Your Supabase URL from Supabase dashboard)
```

```
Variable: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: (Your anon key from Supabase → Settings → API)
```

```
Variable: SUPABASE_SERVICE_ROLE_KEY
Value: (Your service_role key from Supabase → Settings → API)
```

```
Variable: NEXT_PUBLIC_ADMIN_EMAIL
Value: admin@fashionstore.com
```

```
Variable: NEXT_PUBLIC_ADMIN_PASSWORD
Value: (Your admin password)
```

```
Variable: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: (Your WhatsApp number, e.g., 919876543210)
```

### F. Deploy!
1. Click **"Deploy site"**
2. Wait 3-5 minutes
3. Watch the build logs

## 🔧 STEP 5: Update Supabase CORS

After deployment, you'll get a URL like: `https://random-name-123.netlify.app`

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Scroll to **"CORS"** section
5. Add: `https://your-site-name.netlify.app`
6. Click **"Save"**

## ✅ STEP 6: Test!

Visit your Netlify URL and test everything!

---

## 🆘 Need Help?

**Can't push to GitHub?**
- Make sure you're logged into GitHub
- You might need a Personal Access Token (GitHub → Settings → Developer settings → Personal access tokens)

**Build fails on Netlify?**
- Check the build logs
- Make sure all environment variables are set
- Verify your Supabase credentials are correct

**Site loads but has errors?**
- Open browser console (F12)
- Check if environment variables are set correctly
- Verify Supabase CORS is updated
