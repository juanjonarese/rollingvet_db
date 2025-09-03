const { Schema, model } = require("mongoose");

const CarritoSchema = new Schema({
  idUsuario: {
    type: String,
  },
  productos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Producto", // Referencia al modelo de productos
    },
  ],
});

const CarritosModel = model("carrito", CarritoSchema);
module.exports = CarritosModel;
