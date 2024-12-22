import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/lib/models/Admin'; // Admin model
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Connect to the database
    await connectToDatabase();

    // Find the admin user by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Compare the provided password with the hashed password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Set a session cookie (basic example, for production use secure cookies)
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('isLoggedIn', 'true', { httpOnly: true, path: '/' });

    return response;
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
