const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especie: {
    type: String,
    required: true,
    enum: ["perro", "gato", "ave", "otros"],
  },
  raza: { type: String },
  detalleCita: { type: String },
  fecha: { type: Date },
  hora: { type: String },
});


const TurnoModel = mongoose.model("Turno", turnoSchema);

module.exports = TurnoModel;
