# Netlify Deployment Guide

This guide will help you deploy your Next.js shopping website to Netlify.

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. A Netlify account (free tier works fine)
3. Your Supabase credentials

## Step 1: Push Your Code to GitHub

1. If you haven't already, initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Install Netlify CLI (Optional - for manual deployment)

If you want to deploy manually:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Step 3: Deploy via Netlify Dashboard (Recommended)

### Option A: Deploy from GitHub

1. **Go to Netlify**: Visit [https://app.netlify.com](https://app.netlify.com) and sign in

2. **Add New Site**: Click "Add new site" → "Import an existing project"

3. **Connect to Git**: Choose GitHub and authorize Netlify to access your repositories

4. **Select Repository**: Choose your shopping website repository

5. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (or leave default - the plugin handles this)
   - **Node version**: `20` (or leave default)

6. **Set Environment Variables**: Click "Show advanced" → "New variable" and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
   NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
   NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
   ```

7. **Deploy**: Click "Deploy site"

### Option B: Deploy via Netlify CLI

1. **Login to Netlify**:
   ```bash
   netlify login
   ```

2. **Initialize Site**:
   ```bash
   netlify init
   ```
   Follow the prompts to connect your site.

3. **Set Environment Variables**:
   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_supabase_url"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_anon_key"
   netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key"
   netlify env:set NEXT_PUBLIC_ADMIN_EMAIL "your_admin_email"
   netlify env:set NEXT_PUBLIC_ADMIN_PASSWORD "your_admin_password"
   netlify env:set NEXT_PUBLIC_WHATSAPP_NUMBER "your_whatsapp_number"
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

## Step 4: Configure Environment Variables

**Important**: You must set these environment variables in Netlify:

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Public Supabase key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Private Supabase key (keep secret!) |
   | `NEXT_PUBLIC_ADMIN_EMAIL` | admin@fashionstore.com | Admin login email |
   | `NEXT_PUBLIC_ADMIN_PASSWORD` | Your admin password | Admin login password |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number | WhatsApp contact number |

## Step 5: Update Supabase CORS Settings

1. Go to your Supabase dashboard
2. Navigate to **Settings** → **API**
3. Add your Netlify domain to the allowed CORS origins:
   - `https://your-site-name.netlify.app`
   - `https://your-custom-domain.com` (if you have one)

## Step 6: Custom Domain (Optional)

1. In Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Follow the instructions to connect your domain
4. Update DNS records as instructed

## Troubleshooting

### Build Fails

- Check the build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify Node version is 20 or compatible

### Environment Variables Not Working

- Make sure variables starting with `NEXT_PUBLIC_` are set correctly
- Redeploy after adding new environment variables
- Check that variable names match exactly (case-sensitive)

### Images Not Loading

- Verify Supabase CORS settings include your Netlify domain
- Check that image URLs in your database are accessible
- Ensure `next.config.js` allows your image domains

### API Routes Not Working

- Check that Supabase service role key is set (not just anon key)
- Verify API routes are in the `app/api` directory
- Check Netlify function logs for errors

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Site builds successfully
- [ ] Homepage loads correctly
- [ ] Products display properly
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Admin panel is accessible
- [ ] Supabase CORS is configured
- [ ] Custom domain is set (if applicable)

## Continuous Deployment

Once connected to GitHub, Netlify will automatically deploy:
- Every push to the main branch
- Pull requests get preview deployments

You can configure this in **Site settings** → **Build & deploy** → **Continuous Deployment**.

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/nextjs/
- Netlify Support: https://www.netlify.com/support/
