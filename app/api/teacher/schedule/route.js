import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const body = await req.json();
    const club_id = body.club_id;
    const date = body.date;
    const time = body.time;

    await sql`INSERT INTO schedule(club_id, date, time) VALUES (${club_id}, ${date}, ${time})`;

    const members = await sql`
        SELECT club_memberships.student_id, clubs.name AS club_name, students.user_id 
        FROM club_memberships
        JOIN clubs ON clubs.id = club_memberships.club_id
        JOIN students ON club_memberships.student_id = students.id
        WHERE club_memberships.club_id = ${club_id}
    `;

    const notificationMessage = `Practices will be held on ${date} at ${time}`;
    for (const member of members) {
        await sql`
            INSERT INTO notifications(user_id, title, message) 
            VALUES (${member.user_id}, ${member.club_name}, ${notificationMessage})
        `;
    }

    console.log(members);

    return NextResponse.json({ status: 200, members });
}