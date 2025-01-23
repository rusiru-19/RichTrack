import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const body = await req.json();
    const ids = body.notifications; 
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    
    console.log(ids);
    
    if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ success: false, message: 'No notification IDs provided' }, { status: 400 });
    }

    try {
        for (const id of ids) {
            await sql`
                UPDATE notifications
                SET is_read = TRUE
                WHERE id = ${id}
            `;
        }

        return NextResponse.json({ success: true, message: 'Notifications marked as read' }, { status: 200 });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json({ success: false, message: 'Failed to mark notifications as read' }, { status: 500 });
    }
}