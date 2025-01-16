import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
  try {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";

    const sql = neon(url);
    const query = await sql`SELECT * FROM student_tbl `;
    if (!query || query.length === 0) {
        console.log('no data.');
        return new NextResponse('No data', { status: 404 });
      }
      const data = query.map((row) => row);
      return NextResponse.json({ success: true, data: query }, { status: 200 });

      
    

      

  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
