
const {
    obtenerTodosLosUsuariosService, 
    obteneUsuriosPorIdService, 
    iniciarSesionService,crearUsuarioService, recuperarContraseniaUsuarioServices
} = require("../services/usuarios.services")

const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const { statusCode, usuarios } = await obtenerTodosLosUsuariosService();
        res.status(statusCode).json({ usuarios });
    } catch (error) {
        console.error('Error en obtenerTodosLosUsuarios:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}


const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { statusCode, usuario } = await obteneUsuriosPorIdService(req.params.id);
        res.status(statusCode).json({ usuario });
    } catch (error) {
        console.error('Error en obtenerUsuarioPorId:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const crearUsuario = async (req, res) => {
    try {

        const { statusCode, msg, usuario } = await crearUsuarioService(req.body);
        
        res.status(statusCode).json({ 
            msg,
            usuario: usuario || null
        });
    } catch (error) {
        console.error('Error en crearUsuario controller:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const iniciarSesion = async (req, res) => {
    try {
       
        const { statusCode, msg, token, idUsuario } = await iniciarSesionService(req.body);
        res.status(statusCode).json({ msg, token,idUsuario });
    } catch (error) {
        console.error('Error en iniciarSesion controller:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const recuperarContraseniaUsuario = async (req, res) => {
  const { msg, statusCode, error } = await recuperarContraseniaUsuarioServices(
    req.body.emailUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId, 
    iniciarSesion ,crearUsuario, recuperarContraseniaUsuario
}
