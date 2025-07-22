const argon = require("argon2");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuarios.model")


const obtenerTodosLosUsuariosService = async () => {
    const usuarios = await usuariosModel.find();
    return {
        usuarios,
        statusCode: 200
    }
}

const obteneUsuriosPorIdService = async (idUsuario) => {
    const usuario = await usuariosModel.findById(idUsuario);
    return {
        usuario,
        statusCode: 200
    };
};



const iniciarSesionService = async (body) => {
    try {
        const usuarioExiste = await usuariosModel.findOne({ emailUsuario: body.emailUsuario });
     
        if (!usuarioExiste) {
            return {
                msg: "usuario o contraseña incorrecta User",
                statusCode: 400,
            }
        }

        // VERIFICACIÓN AGREGADA: Comprobar si la contraseña existe y no está vacía
        if (!usuarioExiste.contraseniaUsuario || usuarioExiste.contraseniaUsuario.trim() === '') {
            console.error('Usuario encontrado pero sin contraseña válida:', {
                id: usuarioExiste._id,
                email: usuarioExiste.emailUsuario,
                password: usuarioExiste.contraseniaUsuario
            });
            return {
                msg: "Error en la cuenta del usuario. Contacte al administrador.",
                statusCode: 400,
            }
        }

        const passCheck = await argon.verify(usuarioExiste.contraseniaUsuario, body.contraseniaUsuario)
        console.log('Resultado de verificación:', passCheck)
        
        if (!passCheck) {
            return {
                msg: "usuario o contraseña incorrecta Pass",
                statusCode: 400,
            }
        }

        const payload = {
            idUsuario: usuarioExiste._id,
            idCarrito: usuarioExiste.idCarrito,
            rolUsuario: usuarioExiste.rolUsuario
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1h"})
        
        return {
            msg: "usuario logeado",
            token,
            statusCode: 200,
        }
        
    } catch (error) {
        console.error('Error en iniciarSesionService:', error);
        return {
            msg: "Error interno del servidor",
            statusCode: 500,
        }
    }
}

module.exports = { obtenerTodosLosUsuariosService, obteneUsuriosPorIdService, iniciarSesionService }