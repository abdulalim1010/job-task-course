import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // `params` এখন Promise
  const { params } = context;
  const resolvedParams = await params; // unwrap the promise
  const { id } = resolvedParams;

  try {
    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const coursesCollection = db.collection("courses");

    const course = await coursesCollection.findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
