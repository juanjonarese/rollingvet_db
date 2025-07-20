const express = require("express");
const { 
    obtenerTodosLosUsuarios, 
    obtenerUsuarioPorId, 
    crearUsuario, inciarSesion
    
} = require("../controllers/usuarios.controllers");

const router = express.Router();


router.post("/login", inciarSesion);


router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.post("/", crearUsuario);



module.exports = router;
