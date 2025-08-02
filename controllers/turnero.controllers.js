const {
  crearTurnoServices,
  obtenerTodosLosTurnosServices,
} = require("../services/turnero.services");

exports.crearTurno = async (req, res) => {
  try {
    const turno = await crearTurnoServices(req.body);
    res.status(201).json(turno);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await obtenerTodosLosTurnosServices();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
