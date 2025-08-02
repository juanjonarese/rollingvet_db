const mercadoPagoServices = async () => {
  try {
    const client = new MercadoPagoConfig({ accessToken: `${process.env.ACCESS_TOKEN_MP}` });

    const preference = new Preference(client);

    const res = await preference.create({
      body: {
        items: [
          {
            title: 'Mi producto',
            quantity: 1,
            unit_price: 2000,
            currency_id: 'ARS',
          }
        ],
        back_urls: {
          success: 'Aqui la url del sitio web con el pago exitoso',
          failure: 'Aqui la url del sitio web con el pago fallido',
          pending: 'Aqui la url del sitio web con el pago pendiente'
          // las backs urls deben estar deployadas desde el frontend
        },
      }
    });
    console.log(res);
    return{
        msg:"Activado",
        statusCode: 200,
    }
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  mercadoPagoServices,
};