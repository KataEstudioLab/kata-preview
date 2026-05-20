const { MercadoPagoConfig, Preference } = require('mercadopago');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          title: 'Oficina de Estratégia — Estúdio Kata',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 150,
        }],
        back_urls: {
          success: `${req.headers.origin}/obrigado`,
          failure: `${req.headers.origin}/checkout`,
          pending: `${req.headers.origin}/obrigado`,
        },
      },
    });

    res.json({ preferenceId: result.id, amount: 150 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
