const express = require("express");
const {
    
    crearUsuario,
   
    obtenerTodosLosUsuarios, 
    obtenerUsuarioPorId, 
    iniciarSesion,  
    recuperarContraseniaUsuario, cambioDeContraseniaUsuarioToken,actualizarRolUsuario,
    eliminarUnUsuarioPorId

} = require("../controllers/usuarios.controllers");

const router = express.Router();



router.post("/", crearUsuario);
router.post("/login", iniciarSesion); 
router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.delete("/:id" , eliminarUnUsuarioPorId)
router.put("/:id/rol", actualizarRolUsuario);
router.post("/recoveryPass", recuperarContraseniaUsuario)
router.post("/changeNewPassUser", cambioDeContraseniaUsuarioToken)


module.exports = router;