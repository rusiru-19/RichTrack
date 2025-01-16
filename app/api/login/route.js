import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    const pwd = "hellomotherfuckers";
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";

    const sql = neon(url);
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return new NextResponse('Email and password are required', { status: 400 });
    }

    const cred = await sql`SELECT role, password FROM users WHERE username = ${email}`;

    if (!cred || cred.length === 0) {
      console.log('No user found in the database.');
      return new NextResponse('No user found', { status: 404 });
    }

    if (cred[0].password === password) {
      const role = cred[0].role;
      const user = {
        username : email,
        role : role
      };

      const payload = {
        username: user.username,
        role: user.role
      }; 

      const opt = {
        expiresIn: '1h',
      };

    

      const token = jwt.sign(payload, pwd, opt);
     // console.log('User logged in:', email); 
      if(role === 'admin'){

        return NextResponse.json({ data:{token, role}, }, { status: 200 });
      }else if(role == 'teacher'){
        return NextResponse.json({ data:{token, role}, }, { status: 200 });
      }else{
        return NextResponse.json({ data:{token, role}, }, { status: 200 });
      }

      
    } else {
      console.log('Invalid password');
      return new NextResponse('Invalid password', { status: 401 });
    }
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
