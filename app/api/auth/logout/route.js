import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
