const express = require("express");
const {
    
    crearUsuario,
   
    obtenerTodosLosUsuarios, 
    obtenerUsuarioPorId, 
    iniciarSesion,  
    recuperarContraseniaUsuario, cambioDeContraseniaUsuarioToken

} = require("../controllers/usuarios.controllers");

const router = express.Router();



router.post("/", crearUsuario);
router.post("/login", iniciarSesion); 
router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.post("/recoveryPass", recuperarContraseniaUsuario)
router.post("/changePass", cambioDeContraseniaUsuarioToken)


module.exports = router;