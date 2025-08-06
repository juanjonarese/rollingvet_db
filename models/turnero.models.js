const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, trim: true, required: true},
  especie: {
    type: String,
    trim: true,
    required: true,
    enum: ["perro", "gato", "ave", "otros"],
  },
  raza: { type: String,
    trim: true
   },
  detalleCita: { type: String },
  fecha: { type: Date },
  hora: { type: String },
});


const TurnoModel = mongoose.model("Turno", turnoSchema);

module.exports = TurnoModel;
