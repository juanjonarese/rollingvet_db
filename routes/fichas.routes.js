const express = require("express");
const router = express.Router();
const {
    obtenerFichas,
    obtenerFichaPorID,
    crearFicha,
    actualizarFicha,
    eliminarFicha
} = require("../controllers/fichas.controllers.js");

router.get("/", obtenerFichas);
router.get("/:id", obtenerFichaPorID);
router.post("/", crearFicha);
router.put("/:id", actualizarFicha);
router.delete("/:id", eliminarFicha)

module.exports = router;