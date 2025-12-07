# 📦 How to Add Size & Color Varieties

## Step 1: Run the ADDON Schema

1. Go to your **Supabase Dashboard**
2. Click **SQL Editor**
3. Click **New Query**
4. Open the file: `lib/ADDON_SCHEMA.sql`
5. **Copy ALL the code** from that file
6. **Paste** into Supabase SQL Editor
7. Click **Run** button
8. You should see: ✅ "Success"

## Step 2: Use the New Features

### In Admin Portal:

1. Go to **Products** tab
2. Click **Add Product** or **Edit** an existing product
3. You'll now see:
   - **Available Sizes**: Check boxes for common sizes (XS, S, M, L, XL, etc.)
   - **Custom Sizes**: Type custom sizes separated by commas
   - **Default Size**: Select which size is default
   - **Available Colors**: Check boxes for common colors
   - **Custom Colors**: Type custom colors separated by commas
   - **Default Color**: Select which color is default

### Image URL Fix:

- **Better Input**: Now uses proper URL input field
- **Validation**: Automatically validates URLs
- **Enter Key**: Press Enter to add URL quickly
- **No Prompt**: Direct input field instead of popup

## What Changed:

### Database:
- ✅ Added `available_sizes` column (array of sizes)
- ✅ Added `available_colors` column (array of colors)
- ✅ Added `default_size` column
- ✅ Added `default_color` column
- ✅ Created `product_variants` table (for future advanced variants)

### Admin Form:
- ✅ Better image URL input with validation
- ✅ Size selection with checkboxes
- ✅ Color selection with checkboxes
- ✅ Custom size/color input
- ✅ Default size/color selection

## Notes:

- **Safe to Run**: The ADDON schema won't break existing products
- **Default Values**: Existing products will have empty arrays for sizes/colors
- **Backward Compatible**: Products without sizes/colors will still work
- **Optional**: You don't have to add sizes/colors to every product

## Example:

**Product: "Men's T-Shirt"**
- Sizes: S, M, L, XL (checked)
- Default Size: M
- Colors: Red, Blue, Black (checked)
- Default Color: Black

The product will show these options to customers!

---

**That's it! Your products now support size and color varieties!** 🎉





