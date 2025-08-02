const TurnoModel = require("../models/turnero.models");

const crearTurnoServices = async (data) => {
  const nuevoTurno = new Turno(data);
  return await nuevoTurno.save();
};

const obtenerTodosLosTurnosServices = async () => {
  return await TurnoModel.find();
};

module.exports = {
  crearTurnoServices,
  obtenerTodosLosTurnosServices,
};
