const express = require("express");
const {
    
    crearUsuario,
   
    obtenerTodosLosUsuarios, 
    obtenerUsuarioPorId, 
    iniciarSesion  

} = require("../controllers/usuarios.controllers");

const router = express.Router();







router.post("/", crearUsuario);



router.post("/login", iniciarSesion); 

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUsuarioPorId);



module.exports = router;