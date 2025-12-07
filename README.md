# Fashion Shopping Website

A professional e-commerce website for fashion items (Kurta, T-Shirts, Pants) with WhatsApp-based ordering system and comprehensive admin portal.

## Features

### Customer Features
- 🛍️ Browse products by categories
- 🔥 View trending items
- 📱 Direct WhatsApp ordering (no payment gateway needed)
- 📸 Product image galleries
- 💰 Discount pricing display
- 📱 Responsive design for all devices

### Admin Features (Owner Access Only)
- 🔐 Secure admin login portal
- 📦 Product management (add, edit, delete, upload images)
- 🏷️ Category management
- 🔥 Trending items management
- 🎫 Discount coupons management (internal use only)
- 📊 Order tracking and management
- 💰 Price management
- 📈 Stock quantity tracking

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- WhatsApp Business number

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Go to SQL Editor in your Supabase dashboard
3. Copy and run the SQL schema from `lib/supabase-schema.sql`
4. Go to Settings > API and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (for admin operations)

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ADMIN_EMAIL=your_admin_email@example.com
   ADMIN_PASSWORD=your_admin_password
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   ```

   **Important Notes:**
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp Business number (format: country code + number, no + or spaces)
     - Example: `919876543210` for India (+91 9876543210)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: Your admin login credentials

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Access Admin Portal

1. Navigate to `/admin` in your browser
2. Login with your admin credentials
3. Start managing your products, categories, and orders!

## Project Structure

```
├── app/
│   ├── admin/              # Admin portal pages
│   ├── products/           # Product detail pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── admin/              # Admin components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── ProductManagement.tsx
│   │   ├── CategoryManagement.tsx
│   │   ├── TrendingManagement.tsx
│   │   ├── CouponManagement.tsx
│   │   └── OrdersView.tsx
│   ├── ProductCard.tsx     # Product card component
│   ├── BuyNowButton.tsx    # WhatsApp buy button
│   ├── CategoryFilter.tsx  # Category filter
│   └── TrendingSection.tsx # Trending products
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── supabase-schema.sql # Database schema
└── public/                 # Static assets
```

## Database Schema

The database includes the following tables:

- **categories**: Product categories
- **products**: Product catalog with images, pricing, stock
- **discount_coupons**: Discount codes (admin only)
- **orders**: Order tracking from WhatsApp
- **admin_users**: Admin authentication (optional)

## How WhatsApp Ordering Works

1. Customer clicks "Buy Now via WhatsApp" on any product
2. System creates a formatted message with product details
3. Opens WhatsApp Web/App with pre-filled message
4. Customer sends message to your WhatsApp Business number
5. Order is saved to database for tracking
6. You receive order on WhatsApp and can process it

## Admin Portal Features

### Product Management
- Add/Edit/Delete products
- Upload multiple product images (via URLs)
- Set pricing (regular and discounted)
- Manage stock quantities
- Toggle active/inactive status
- Assign to categories

### Category Management
- Create and manage product categories
- Add category descriptions and images

### Trending Management
- Mark products as trending
- Products appear in "Top Trending" section on homepage

### Coupon Management
- Create discount coupons
- Set percentage or fixed discounts
- Configure validity dates and usage limits
- Track coupon usage
- **Note**: Coupons are for internal use only (not visible to customers)

### Orders View
- View all orders received via WhatsApp
- Update order status (pending, confirmed, shipped, etc.)
- Contact customers directly via WhatsApp
- Track order history

## Customization

### Change WhatsApp Number
Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

### Change Admin Credentials
Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`

### Styling
Modify `tailwind.config.js` to customize colors and theme

### Product Images
Currently supports image URLs. For file uploads, you'll need to:
1. Set up Supabase Storage
2. Add file upload functionality to ProductForm component

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Recommended Hosting
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any Node.js hosting service

### Environment Variables in Production
Make sure to set all environment variables in your hosting platform's environment settings.

## Security Notes

- Admin authentication is currently basic (localStorage-based)
- For production, consider implementing proper authentication with Supabase Auth
- Never commit `.env.local` to version control
- Use Supabase Row Level Security (RLS) policies for additional security

## Support

For issues or questions:
1. Check the Supabase documentation
2. Review Next.js documentation
3. Check environment variables are set correctly

## License

This project is created for your fashion business. Customize as needed!

---

**Built with ❤️ for your fashion business**

