-- ============================================
-- ADDON SCHEMA - Safe to add to existing database
-- ============================================
-- This schema adds size and color variety options
-- Run this AFTER your existing schema
-- It will NOT break existing data
-- ============================================

-- Add size and color columns to products table (if they don't exist)
DO $$ 
BEGIN
    -- Add available_sizes column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'available_sizes'
    ) THEN
        ALTER TABLE products ADD COLUMN available_sizes TEXT[] DEFAULT '{}';
    END IF;

    -- Add available_colors column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'available_colors'
    ) THEN
        ALTER TABLE products ADD COLUMN available_colors TEXT[] DEFAULT '{}';
    END IF;

    -- Add default_size column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'default_size'
    ) THEN
        ALTER TABLE products ADD COLUMN default_size VARCHAR(20);
    END IF;

    -- Add default_color column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'default_color'
    ) THEN
        ALTER TABLE products ADD COLUMN default_color VARCHAR(50);
    END IF;
END $$;

-- Create product_variants table for size/color combinations with different prices
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(20),
  color VARCHAR(50),
  price DECIMAL(10, 2),
  stock_quantity INTEGER DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, size, color)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);

-- Function to update updated_at timestamp for variants
CREATE OR REPLACE FUNCTION update_variants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at for variants
DROP TRIGGER IF EXISTS update_product_variants_updated_at ON product_variants;
CREATE TRIGGER update_product_variants_updated_at 
    BEFORE UPDATE ON product_variants
    FOR EACH ROW EXECUTE FUNCTION update_variants_updated_at();

-- ============================================
-- DONE! Your existing data is safe.
-- New columns have default values (empty arrays)
-- Existing products will work as before
-- ============================================





