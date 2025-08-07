const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especie: {
    type: String,
    required: true,
    enum: ["perro", "gato", "ave", "otros"],
  },
  raza: { type: String },

  detalleCita: { type: String, required: true },
  fecha: { type: Date },
  hora: { type: String },
});

module.exports = mongoose.model("TurnoModel", turnoSchema);
