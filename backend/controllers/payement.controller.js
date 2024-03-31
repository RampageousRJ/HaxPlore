import Stripe from 'stripe';

export const newOrder = async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const items = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.qnty
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/paymentDetails?success=true", // Correct typo in URL
      cancel_url: "http://localhost:5173/paymentDetails?failure=true", // Correct typo in URL
    });
    console.log(session);
    res.json({ session, id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session", error);
    res.status(500).send("Internal Server Error");
  }
};

export const confirmBooking = (req, res) => {
  res.json({ success: true })
}

export const refundMoney = (req, res) => {
  res.json({ success: true })
}
