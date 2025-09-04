const TurnoModel = require("../models/turnero.models");

const crearTurnoServices = async (data) => {
  const nuevoTurno = new TurnoModel(data);
  return await nuevoTurno.save();
};

const obtenerTodosLosTurnosServices = async () => {
  return await TurnoModel.find()
  .populate("veterinarioConsulta", "nombreUsuario")
  .exec();
};

module.exports = {
  crearTurnoServices,
  obtenerTodosLosTurnosServices,
};
