import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb"; // path to your lib/mongodb.js

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("learningPlatform"); // your database name
    const coursesCollection = db.collection("courses"); // your collection name

    const courses = await coursesCollection.find({}).toArray();

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
