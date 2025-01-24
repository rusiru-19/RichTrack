import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST() {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const members = await sql`
        SELECT club_memberships.club_id, COUNT(*), clubs.name
        FROM club_memberships
        JOIN clubs ON club_memberships.club_id = clubs.id
        GROUP BY club_memberships.club_id, clubs.name
        ORDER BY COUNT(*) DESC
        LIMIT 1`
    const ach = await sql`
        SELECT achievements.club_id, COUNT(*), clubs.name
        FROM achievements
        JOIN clubs ON achievements.club_id = clubs.id
        GROUP BY achievements.club_id, clubs.name
        ORDER BY COUNT(*) DESC
        LIMIT 1`
    const event = await sql`
        SELECT clubs.name, schedule.time, schedule.date
        FROM schedule
        JOIN clubs ON schedule.club_id::integer = clubs.id
        ORDER BY CONCAT(schedule.date, ' ', schedule.time) DESC
        LIMIT 1`
    return NextResponse.json({
        "most-members": members,
        "most-achievements": ach,
        "upcoming-event": event

    },{
        status:200
    })
    }