# Create .env.local File

## Quick Steps:

1. **Create a file named `.env.local`** in your project root folder
   - Location: `C:\Users\Hp\Desktop\shopping web\.env.local`

2. **Copy and paste this content:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://cggvjgpjxqhwpindwuzd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
NEXT_PUBLIC_ADMIN_EMAIL=admin@fashionstore.com
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

3. **Replace the placeholders:**
   - `YOUR_ANON_KEY_HERE` → Get from Supabase Dashboard → Settings → API → anon public key
   - `YOUR_SERVICE_ROLE_KEY_HERE` → Get from Supabase Dashboard → Settings → API → service_role key
   - `919876543210` → Your WhatsApp Business number

4. **Save the file**

5. **Restart your dev server:**
   - Press `Ctrl + C` in terminal
   - Run `npm run dev` again

## To Get Your API Keys:

1. Go to: https://supabase.com/dashboard
2. Click on your project
3. Click **Settings** (gear icon) → **API**
4. Copy:
   - **anon public** key → Goes in `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Goes in `SUPABASE_SERVICE_ROLE_KEY`

## Default Login (if env vars not set):
- Email: `admin@fashionstore.com`
- Password: `admin123`

