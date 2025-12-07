# 🚀 Deploy Your Website - Step by Step Guide

## ✅ Step 1: COMPLETED
- ✅ Git repository initialized
- ✅ All files committed

## 📝 Step 2: Create GitHub Repository

### Follow these steps:

1. **Go to GitHub**: Open https://github.com in your browser
2. **Sign in** to your GitHub account (or create one if you don't have it)
3. **Create New Repository**:
   - Click the **"+"** icon in the top right corner
   - Select **"New repository"**
4. **Repository Settings**:
   - **Repository name**: `shopping-website` (or any name you like)
   - **Description**: "Fashion shopping website built with Next.js"
   - **Visibility**: Choose **Public** (or Private if you prefer)
   - ⚠️ **DO NOT** check "Initialize with README" (we already have files)
   - ⚠️ **DO NOT** add .gitignore or license
5. **Click "Create repository"**

### After creating, GitHub will show you commands. IGNORE THEM - I'll run the correct ones for you!

6. **Copy your repository URL** - It will look like:
   - `https://github.com/YOUR_USERNAME/shopping-website.git`
   - Or: `git@github.com:YOUR_USERNAME/shopping-website.git`

7. **Come back here and tell me your GitHub username and repository name**, and I'll push the code for you!

---

## 📤 Step 3: Push to GitHub (I'll do this for you)

Once you give me your GitHub details, I'll run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 4: Deploy on Netlify

After code is pushed to GitHub:

1. **Go to Netlify**: https://app.netlify.com
2. **Sign up/Login** (you can use GitHub to sign in)
3. **Add New Site**:
   - Click **"Add new site"** button
   - Select **"Import an existing project"**
4. **Connect to Git**:
   - Click **"GitHub"** (or your Git provider)
   - Authorize Netlify to access your repositories
5. **Select Your Repository**:
   - Find and select `shopping-website` (or your repo name)
6. **Configure Build Settings**:
   - **Build command**: `npm run build` (should be auto-filled)
   - **Publish directory**: `.next` (or leave default)
   - Click **"Show advanced"** to add environment variables
7. **Add Environment Variables** (IMPORTANT!):
   Click **"New variable"** for each:
   
   | Variable Name | Value |
   |--------------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
   | `NEXT_PUBLIC_ADMIN_EMAIL` | admin@fashionstore.com |
   | `NEXT_PUBLIC_ADMIN_PASSWORD` | Your admin password |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number |

8. **Deploy**:
   - Click **"Deploy site"** button
   - Wait 3-5 minutes for build to complete

9. **Update Supabase CORS**:
   - Go to Supabase Dashboard → Settings → API
   - Add your Netlify URL to allowed origins:
     `https://your-site-name.netlify.app`

---

## 🎉 Done!

Your website will be live at: `https://your-site-name.netlify.app`

---

## 💡 Need Help?

If you get stuck at any step, just tell me and I'll help you!
