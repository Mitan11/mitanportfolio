import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
});
export async function POST(req) {
  await dbConnect();
  try {
    // Basic rate limiting by IP (using x-forwarded-for if behind proxy)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    try {
      await limiter.check(5, ip); // 5 requests per minute
    } catch {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Please provide an email and password' }, { status: 400 });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.isAdmin) {
      return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });
    }

    const token = generateToken(user._id);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
