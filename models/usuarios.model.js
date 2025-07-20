const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: [true, "Campo nombreUsuario obligatorio"],
    trim: true,
    unique: true,
  },
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
  contrasenia: {
    type: String,
    required: true,
    trim: true,
    /*  match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, */
  },
  idCarrito: {
    type: String,
  },
});

const usuariosModel = model("usuarios", UsuarioSchema);
module.exports = usuariosModel;
