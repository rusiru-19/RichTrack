import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const body = await req.json();
    const student = body.student;
    const id = body.id;
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const result = await sql`INSERT INTO attendance (schedule_id, student_id, is_present) OVERRIDING SYSTEM VALUE VALUES  (${id}, ${student}, 'yes' )`;
    console.log(result);
    return NextResponse.json({
        message: "Attendance recorded successfully",
    },{
        status: 200
    })
}