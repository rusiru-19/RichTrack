import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { error } from 'console';

export async function POST(req) {
    const body = await req.json();
    const id = body.id;
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const query = await sql`
    SELECT notifications.title, notifications.message, notifications.id
    FROM notifications
    JOIN users ON notifications.user_id = users.id
    WHERE users.username = ${id} AND notifications.is_read = FALSE `;
    console.log(error)
    return NextResponse.json(
        {
        msg: query
        },
        {
        status: 200,
    })

}