import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const body = await req.json();
    const club_id = body.club_id;
    const date = body.date;
    const time = body.time;
    const result = await sql`INSERT INTO schedule( club_id, date, time) VALUES (${club_id}, ${date}, ${time})`;
    console.log(result);
    return NextResponse.json({status: 200})

}