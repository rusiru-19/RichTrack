import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    try{
        const query = await sql`SELECT count(id) FROM students`;
        const query1 = await sql`SELECT count(id) FROM clubs`;
        const query2 = await sql`SELECT count(id) FROM users`;
        return NextResponse.json(
            {
                "count" : [
                    query,
                    query2,
                    query1

                ]
            }
        )
    }catch{

    }

}