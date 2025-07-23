const { Schema, model } = require("mongoose");

const CarritoSchema = new Schema({
  idUsuario: {
    type: String,
   
  },
  productos: {
    
    default: [], 
  },
});

const carritoMascotas = model("carrito", CarritoSchema);
module.exports = carritoMascotas;
