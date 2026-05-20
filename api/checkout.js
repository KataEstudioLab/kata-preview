const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [{ price: 'price_1TZGKRA192J4BKrXlP9EMmAi', quantity: 1 }],
      mode: 'payment',
      return_url: `${req.headers.origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({ clientSecret: session.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
