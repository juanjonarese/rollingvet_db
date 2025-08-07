const pagarCarritoMp = async (req, res) => {
 const {statusCode, msg, error} = await mercadoPagoServices();
    try {
        res.status(statusCode).json({ msg });
    } catch {
        res.status(statusCode).json({ error });
    }
}
module.exports = {
  pagarCarritoMp,
  }