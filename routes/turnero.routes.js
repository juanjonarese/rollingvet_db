const express = require("express");
const router = express.Router();
const {
  crearTurno,
  obtenerTurnos,
} = require("../controllers/turnero.controllers");

router.post("/", crearTurno);
router.get("/", obtenerTurnos);

module.exports = router;
