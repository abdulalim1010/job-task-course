"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data.error ? null : data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course._id, price: course.price }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Stripe Checkout page
      } else {
        alert("Payment init failed!");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("Payment init failed!");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>;

  if (!course)
    return (
      <p className="text-center mt-20 text-red-500 text-lg">
        Course not found.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p className="text-gray-600">Price: ${course.price}</p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
      >
        Pay Now
      </button>
    </div>
  );
}
