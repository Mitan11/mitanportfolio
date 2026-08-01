import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();

    // Clear existing users
    await User.deleteMany({});

    // Create the admin user from environment variables
    const name = process.env.ADMIN_USER || 'admin';
    const email = name.includes('@') ? name : `${name}@admin.com`;
    const password = process.env.ADMIN_PASSWORD || 'password123';

    const user = new User({
      name,
      email,
      password,
      isAdmin: true,
    });

    // We use .save() so that the 'pre' save hook in the User model hashes the password
    await user.save();

    return NextResponse.json({ 
      message: 'Admin user seeded successfully',
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
