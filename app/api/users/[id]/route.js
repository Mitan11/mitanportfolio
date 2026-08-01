import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import User from '@/models/User';

import dbConnect from '@/lib/mongodb';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    
    const adminUser = await User.findById(decoded.id);
    if (!adminUser || !adminUser.isAdmin) return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });

    const { id } = await params;
    const data = await User.findById(id).select('-password -resetPasswordToken');
    if (!data) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  const adminUser = await User.findById(decoded.id);
  if (!adminUser || !adminUser.isAdmin) return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });

    const { id } = await params;
    const body = await req.json();
    const data = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!data) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  const adminUser = await User.findById(decoded.id);
  if (!adminUser || !adminUser.isAdmin) return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });

    const { id } = await params;
    const deleted = await User.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('API Error:', error.message, error.stack);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 400 });
  }
}
