const {crearUsuarioService} = require("../services/usuarios.services")


const crearUsuario = async (req,res)=> {
    const{statusCode,msg} = await crearUsuarioService(req.body);
    res.status(statusCode).json({msg})
}



module.exports={crearUsuario}