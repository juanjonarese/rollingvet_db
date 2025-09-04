const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombreMascota: { type: String, required: true },
   especie: {
    type: String,
    enum: ["perro", "gato", "ave", "otros"],
  },
  veterinarioConsulta: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },

  detalleCita: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
});

module.exports = mongoose.model("TurnoModel", turnoSchema);
