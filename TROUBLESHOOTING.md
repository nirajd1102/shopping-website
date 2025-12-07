# 🔧 Troubleshooting Common Errors

## Common Errors and Fixes

### 1. **"useCart must be used within a CartProvider"**
**Fix:** Make sure `CartProvider` wraps your app in `app/layout.tsx`
- Already fixed in the code ✅

### 2. **"useTheme must be used within a ThemeProvider"**
**Fix:** Make sure `ThemeProvider` wraps your app in `app/layout.tsx`
- Already fixed in the code ✅

### 3. **Hydration Mismatch Error**
**Fix:** This happens with dark mode. The code already handles this with `suppressHydrationWarning` ✅

### 4. **"Cannot read property of undefined"**
**Possible causes:**
- Missing environment variables
- Supabase not configured
- Cart/Theme providers not wrapping components

### 5. **Build/Compile Errors**
**Fix:** 
1. Delete `.next` folder
2. Run `npm install` again
3. Run `npm run dev`

### 6. **Module Not Found Errors**
**Fix:**
```bash
npm install
```

### 7. **TypeScript Errors**
**Fix:**
- Make sure all imports are correct
- Check if all components are exported properly

## Quick Fixes

### Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Clear Cache
```bash
# Delete .next folder
rm -rf .next  # Mac/Linux
rmdir /s .next  # Windows
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
```

## Still Having Issues?

**Please share:**
1. The exact error message
2. Where it appears (browser console or terminal)
3. What page/action triggers it

This will help me fix it quickly! 🚀





