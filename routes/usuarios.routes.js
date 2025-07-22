const express = require("express");
const { 
    
    crearUsuario
    
} = require("../controllers/usuarios.controllers");

const router = express.Router();






router.post("/", crearUsuario);




module.exports = router;
