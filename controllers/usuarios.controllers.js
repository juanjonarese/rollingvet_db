const usuariosModel = require("../models/usuarios.model");

const {
    obtenerTodosLosUsuariosService, 
    obteneUsuriosPorIdService, 
    iniciarSesionService,crearUsuarioService, recuperarContraseniaUsuarioServices, cambioDeContraseniaUsuarioTokenServices, 
    actualizarRolUsuarioService, eliminarUnUsuarioPorIdServices
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

const eliminarUnUsuarioPorId = async (req, res) => {
  const { msg, statusCode } = await eliminarUnUsuarioPorIdServices(
    req.params.id
  );
  res.status(statusCode).json({ msg });
};


const iniciarSesion = async (req, res) => {
    try {
       
        const { statusCode, msg, token, rolUsuario } = await iniciarSesionService(req.body);
        res.status(statusCode).json({ msg, token,rolUsuario });
    } catch (error) {
        console.error('Error en iniciarSesion controller:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const recuperarContraseniaUsuario = async (req, res) => {
  try {
    const { msg, statusCode } = await recuperarContraseniaUsuarioServices(
      req.body.emailUsuario
    );
    res.status(statusCode).json({ msg });
  } catch (error) {
    console.error("Error al recuperar contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



const cambioDeContraseniaUsuarioToken = async (req, res) => {
  try {
    console.log("token query", req.query.token);
    console.log("nueva contraseña", req.body.contrasenia);

    const { msg, statusCode } = await cambioDeContraseniaUsuarioTokenServices(
      req.query.token,
      req.body.contrasenia
    );

    res.status(statusCode).json({ msg });
  } catch (error) {
    console.error("Error en cambioDeContraseniaUsuarioToken:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};




const actualizarRolUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { rolUsuario } = req.body;

    const usuarioActualizado = await usuariosModel.findByIdAndUpdate(
      id,
      { rolUsuario: rolUsuario},
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({ msg: "Rol actualizado", usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el rol" });
  }
};


module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId, 
    iniciarSesion ,crearUsuario, recuperarContraseniaUsuario, cambioDeContraseniaUsuarioToken, actualizarRolUsuario, eliminarUnUsuarioPorId
}
