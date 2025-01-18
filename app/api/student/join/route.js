import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
  try {
    const url = "postgresql://rits-db_owner:XL2bfgYV0mdS@ep-bold-feather-a1qhbwrd.ap-southeast-1.aws.neon.tech/rits-db?sslmode=require";
    const body = await req.json();
    const { club_id, user } = body;

    // Initialize the database connection
    const sql = neon(url);

    // Perform the SQL query using the neon connection
    const result = await sql`
      WITH student_info AS (
        SELECT students.id
        FROM students
        JOIN users ON students.user_id = users.id
        WHERE users.username = ${user}
      )
      INSERT INTO club_memberships (club_id, student_id)
      SELECT ${club_id}, id FROM student_info;
    `;

    // Return success response
    console.log(result)
    return NextResponse.json({
      message: "Club membership added successfully",
    }, {
      status: 200,
    });

  } catch (error) {
    console.error("Error adding club membership:", error);

    // Return error response
    return NextResponse.json({
      message: "Failed to add club membership",
      error: error.message || "Unknown error",
    }, {
      status: 500,
    });
  }
}
