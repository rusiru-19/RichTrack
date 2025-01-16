import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);

    try {
        const body = await req.json().catch(() => ({}));
        if (body.id) {
            const query = await sql`SELECT * FROM students WHERE id = ${body.id}`;
            const query1 = await sql`SELECT clubs.name, club_memberships.joined_at 
                                    FROM club_memberships 
                                    JOIN clubs ON club_memberships.club_id = clubs.id
                                    WHERE club_memberships.student_id = ${body.id}
            `;
            const query3 = await sql` SELECT clubs.name, achievements.title, achievements.description, achievements.date
                                    FROM achievements
                                    JOIN clubs ON achievements.club_id = clubs.id
                                    WHERE achievements.student_id = ${body.id}
                                    `;

            return NextResponse.json(
                { msg: query, clubs: query1, ach: query3 },
                
                { status: 200 }
            );
        }

        const query = await sql`SELECT * FROM students`;
        return NextResponse.json(
            { msg: query },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { msg: error.message || "failed" },
            { status: 500 }
        );
    }
}
