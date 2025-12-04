// app/api/student/enrolled/route.js
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("learningPlatform");

    // Replace this with actual user ID from session/auth
    const userId = "dummyUserId";

    const enrolledCourses = await db
      .collection("enrollments")
      .find({ userId })
      .toArray();

    // Populate course details from courses collection
    const courseIds = enrolledCourses.map((c) => c.courseId);
    const courses = await db
      .collection("courses")
      .find({ _id: { $in: courseIds.map((id) => new ObjectId(id)) } })
      .toArray();

    return new Response(JSON.stringify({ courses }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ courses: [] }), { status: 500 });
  }
}
