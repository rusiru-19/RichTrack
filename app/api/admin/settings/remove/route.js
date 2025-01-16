import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const body = await req.json();

        const query = await sql`
            DELETE  FROM users WHERE username = (${body.username})
        `;
        console.log(query);

        return NextResponse.json({
            message: body.name + " Account Deleted",
           
        });

    }