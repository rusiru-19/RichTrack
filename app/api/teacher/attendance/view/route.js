import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST() {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const result = await sql`SELECT schedule.id, schedule.date, schedule.time, clubs.name
    FROM schedule
    JOIN clubs ON schedule.club_id = clubs.id::text`;
    return NextResponse.json({
        data: result,
    },{
        status: 200
    })

}