const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
 
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
  },
  rolUsuario: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  contraseniaUsuario: {
    type: String,
    required: true,
    trim: true,
  },
  idCarrito: {
    type: String,
  },
});

const usuariosModel = model("usuarios", UsuarioSchema);
module.exports = usuariosModel;
