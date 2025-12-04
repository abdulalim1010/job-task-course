import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { courseId, price } = await req.json();

    if (!courseId || !price) {
      return new Response(JSON.stringify({ error: "Missing course ID or price" }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Course: ${courseId}` },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("STRIPE ERROR:", error);
    return new Response(JSON.stringify({ error: "Failed to create checkout session" }), { status: 500 });
  }
}
