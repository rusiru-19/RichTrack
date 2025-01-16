import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const secretKey = 'hellomotherfuckers';

    const token = req.headers.get('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded JWT Token:', decoded);

    return NextResponse.json({ message: 'Token is valid', decoded }, { status: 200 });
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }
}
