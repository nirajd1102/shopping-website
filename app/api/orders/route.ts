import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customer_name,
      customer_phone,
      customer_address,
      products,
      total_amount,
      status = 'whatsapp_pending',
    } = body

    // Save order to database for tracking
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name,
        customer_phone,
        customer_address,
        products: products || [],
        total_amount: total_amount || 0,
        status,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving order:', error)
      // Don't fail the request if database save fails
    }

    return NextResponse.json({ success: true, order: data })
  } catch (error) {
    console.error('Error in orders API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    )
  }
}

