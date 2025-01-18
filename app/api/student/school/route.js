import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST() {
  try {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const result = await sql`SELECT students.first_name, clubs.name, achievements.title, achievements.description, achievements.date 
        FROM achievements
        JOIN students ON achievements.student_id = students.id
        JOIN clubs ON clubs.id = achievements.club_id
    ` ;
    return NextResponse.json({
        data: result,
    },{
        status: 200
    }
)
  }catch(error){
    console.log(error)
        return NextResponse.json({
            error
        },{
            status: 500
        })

  }
}