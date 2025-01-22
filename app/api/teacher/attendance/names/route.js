import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const body = await req.json();
    const id = body.id;
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const result = await sql`SELECT club_memberships.student_id, students.first_name 
        FROM schedule
        JOIN club_memberships ON CAST(schedule.club_id AS INTEGER) = club_memberships.club_id
        JOIN students ON club_memberships.student_id = students.id
        WHERE schedule.id = ${id}  `;
    return NextResponse.json({
        result
    },{
        status: 200
    })
}