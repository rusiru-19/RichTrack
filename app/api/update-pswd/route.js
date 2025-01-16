import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const body = await req.json();
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);

    const query = await sql`UPDATE users SET password = (${body.password}) WHERE username = (${body.username})`;
    return NextResponse.json( {
        msg: "Password updated successfully",
    });
}