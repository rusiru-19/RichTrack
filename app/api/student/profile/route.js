import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
  try {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const body = await req.json();
    const id = body.id;
    const sql = neon(url);
    console.log(id)
    const query = await sql`
    SELECT 
      students.first_name, 
      students.last_name, 
      students.class, 
      students.admission_no
    FROM students
    JOIN users ON users.id = students.user_id
    WHERE users.username = ${id};
  `;
  

    if (!query || query.length === 0) {
        console.log('no data.');
        return new NextResponse({query}, { status: 404 });
      }
      const data = query.map((row) => row);
      console.log(data)
      return NextResponse.json({  data: query }, { status: 200 });

      
    

      

  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
