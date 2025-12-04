import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { courseId, courseTitle, price } = await req.json();

    if (!courseId || !price) {
      return new Response(JSON.stringify({ error: "Course info required" }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseTitle,
            },
            unit_amount: Math.round(price * 100), // convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/student/dashboard?success=true&courseId=${courseId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Payment session failed" }), { status: 500 });
  }
}
