const express = require("express");
const {
    
    crearUsuario,
    obtenerTodosLosUsuarios, 
    obtenerUsuarioPorId, 
    iniciarSesion,  
    recuperarContraseniaUsuario,
    cambioContrasenia

} = require("../controllers/usuarios.controllers");
const authMiddlewares = require("../middlewares/auth.middlewares");

const router = express.Router();







router.post("/", crearUsuario);



router.post("/login", iniciarSesion); 

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.post("/recoveryPass", recuperarContraseniaUsuario)
router.post("/changePass", cambioContrasenia)


module.exports = router;