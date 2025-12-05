import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) return new Response(JSON.stringify([]), { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db("learningPlatform");
    const enrollments = await db.collection("enrollments")
      .find({ studentId })
      .toArray();

    return new Response(JSON.stringify(enrollments), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
