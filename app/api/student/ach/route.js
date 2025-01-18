import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    try{
        const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
        const body = await req.json();
        const id = body.id;
        const sql = neon(url);
        const result = await sql`SELECT 
        clubs.name , 
        achievements.title, 
        achievements.description
        FROM achievements
        JOIN clubs ON achievements.club_id = clubs.id
        JOIN students ON achievements.student_id = students.id
        JOIN users ON students.user_id = users.id
        WHERE users.username = ${id};
     `;

     
        return NextResponse.json({
            data: result,
        },{
            status: 200
        }
    )
    }catch(error){
        console.log(error)
        return new Response({"error": error}, {status: 500});
    }

}