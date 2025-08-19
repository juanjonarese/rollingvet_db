const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombreMascota: { type: String, required: true },
  /*   especie: {
    type: String,
    required: true,
    enum: ["perro", "gato", "ave", "otros"],
  },
  raza: { type: String }, */

  detalleCita: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
});

module.exports = mongoose.model("TurnoModel", turnoSchema);
