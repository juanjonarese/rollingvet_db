const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombreMascota: { type: String, required: true },
   especie: {
    type: String,
    enum: ["perro", "gato", "ave", "otros"],
  },


  detalleCita: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
});

module.exports = mongoose.model("TurnoModel", turnoSchema);
