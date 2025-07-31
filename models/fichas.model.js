const { Schema, model } = require("mongoose");

const FichaSchema = new Schema({
  nombreMascota: {
    type: String,
    required: true,
    trim: true,
  },
  especieMascota: {
    type: String,
    required: true,
    trim: true,
  },
    idUsuario: {
    type: String,
  },
  consulta: [
    {
      fecha: {
        type: Date,
        default: Date.now,
        required: true,
      },
      motivo: {
        type: String,
        required: true,
        trim: true,
      },
      veterinario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
      }
    }
  ]
});

const FichasModel = model("fichas", FichaSchema);
module.exports = FichasModel;
