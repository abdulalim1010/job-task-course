"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminEnrollments() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // ============================
  // ✅ Function moved OUTSIDE useEffect
  // ============================
  const fetchStudents = async (storedToken) => {
    try {
      const res = await fetch("/api/admin/students", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server response:", text);
        throw new Error("Failed to fetch students");
      }

      const data = await res.json();
      setStudents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // ✅ Load token + fetch students
  // ============================
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return router.push("/auth/login");

    setToken(storedToken);
    fetchStudents(storedToken);
  }, [router]);

  // ============================
  // ✅ Toggle Premium Status
  // ============================
  const togglePremium = async (id) => {
    try {
      const res = await fetch("/api/admin/students/premium", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);

      // IF NEW JWT TOKEN GIVEN, UPDATE LOCAL STORAGE
      if (data.newToken) {
        localStorage.setItem("token", data.newToken);
      }

      alert("Premium Updated!");

      // REFRESH STUDENT LIST
      fetchStudents(token);

    } catch (err) {
      console.log(err);
      alert("Error updating premium!");
    }
  };

  // ============================
  // UI
  // ============================
  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Enrollments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Premium</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.role}</td>

                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={student.isPremium || false}
                    onChange={() => togglePremium(student._id)}
                    className="w-5 h-5"
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
