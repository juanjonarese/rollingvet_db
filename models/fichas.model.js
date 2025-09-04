const { Schema, model } = require("mongoose");

const FichaSchema = new Schema({
  // datos de la persona
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
  },
  
  telefonoUsuario: {
    type: String,
    required: true,
    trim: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
  },

  // datos del animal
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
  razaMascota: {
    type: String,
    trim: true,
  },
  edadMascota: {
    type: String,
    trim: true,
  },

  // datos del turno
  motivoConsulta: {
    type: String,
    required: true,
    trim: true,
  },
  fechaConsulta: {
    type: Date,
    required: true,
  },
  horaConsulta: {
    type: String,
    required: true,
  },
  veterinarioConsulta: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },

  // campo editable por el veterinario
  detallesConsulta: {
    type: String,
    trim: true,
  }
});

const FichasModel = model("fichas", FichaSchema);
module.exports = FichasModel;
