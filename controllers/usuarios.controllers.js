const {obtenerTodosLosUsuariosService, obteneUsuriosPorIdService, crearUsuarioService,iniciarSesionService, obtenerUsuarioPorIdService} = require("../services/usuarios.services")

const obtenerTodosLosUsuarios = async (req,res)=>{
  const {statusCode,usuarios}= await  obtenerTodosLosUsuariosService();
  res.status(statusCode).json({usuarios})

}

const obtenerUsuarioPorId = async (req,res)=> {
    const{statusCode,usuario} = await obtenerUsuarioPorIdService(req.params.id);
    res.status(statusCode).json({usuario})
}

const crearUsuario = async (req,res)=> {
    const{statusCode,msg} = await crearUsuarioService(req.body);
    res.status(statusCode).json({msg})
}

const inciarSesion = async (req,res)=>{
  

    const {statusCode,msg,token}= await iniciarSesionService(req.body);
    res.status(statusCode).json({msg,token})
}

module.exports={
    obtenerTodosLosUsuarios,obtenerUsuarioPorId,crearUsuario, inciarSesion
}