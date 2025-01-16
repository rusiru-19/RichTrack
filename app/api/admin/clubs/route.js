import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST() {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    try{
        const clubs = await sql`SELECT * FROM clubs`;
        const query = await sql`
        SELECT clubs.name, achievements.title, achievements.description, achievements.date
        FROM achievements
        JOIN clubs ON achievements.club_id = clubs.id;
      `;
      

        return NextResponse.json(
            {
               clubs: clubs,
               achievments: query
            }
        )
    }catch{

    }

}