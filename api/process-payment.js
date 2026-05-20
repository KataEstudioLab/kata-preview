const { MercadoPagoConfig, Payment } = require('mercadopago');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

  try {
    const payment = new Payment(client);
    const result = await payment.create({ body: req.body });
    res.json({ status: result.status, id: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
