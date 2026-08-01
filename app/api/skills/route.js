import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import User from '@/models/User';

import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function GET() {
  await dbConnect();
  try {
    const data = await Skill.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  const adminUser = await User.findById(decoded.id);
  if (!adminUser || !adminUser.isAdmin) return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });

    const body = await req.json();
    const data = await Skill.create(body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 400 });
  }
}
