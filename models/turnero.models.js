const { Schema, model } = require("mongoose");


const turnoSchema = new Schema({
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

const TurnoModel = model("TurnoModel", turnoSchema);
module.exports = TurnoModel;

