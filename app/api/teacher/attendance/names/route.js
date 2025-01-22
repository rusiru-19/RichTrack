import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const body = await req.json();
    const id = body.id;
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const result = await sql`SELECT club_memberships.student_id, students.first_name, attendance.is_present
    FROM schedule
    JOIN club_memberships ON CAST(schedule.club_id AS INTEGER) = club_memberships.club_id
    JOIN students ON club_memberships.student_id = students.id
    LEFT JOIN attendance ON CAST(schedule.id AS TEXT) = attendance.schedule_id AND students.id = CAST(attendance.student_id AS INTEGER)
    WHERE schedule.id = ${id}  `;
    return NextResponse.json({
        result
    },{
        status: 200
    })
}