import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { courseId, price } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Course Payment" },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("STRIPE ERROR:", err);
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
