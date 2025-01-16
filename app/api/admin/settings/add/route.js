import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const sql = neon(url);
    const body = await req.json();

    // Check if the role is valid
    if (body.role === "admin" || body.role === "student" || body.role === "teacher") {
        // Step 1: Insert into the users table
        const userQuery = await sql`
            INSERT INTO users (username, password, role) 
            VALUES (${body.username}, ${body.password}, ${body.role}) 
            RETURNING id
        `;

        const userId = userQuery[0].id; // Get the auto-incremented user ID

        // Step 2: Insert into the appropriate table based on the role
        if (body.role === "student") {
            await sql`
                INSERT INTO students (user_id, first_name, last_name, admission_no, class) 
                VALUES (${userId}, ${body.firstName}, ${body.lastName}, ${body.admissionNo}, ${body.className})
            `;
        } else if (body.role === "teacher") {
            await sql`
                INSERT INTO teachers (user_id, first_name, last_name, subject) 
                VALUES (${userId}, ${body.firstName}, ${body.lastName}, ${body.subject})
            `;
        }

        return NextResponse.json({
            message: "Account created successfully",
        });
    } else {
        return NextResponse.json({
            message: "Invalid Role",
        });
    }
}