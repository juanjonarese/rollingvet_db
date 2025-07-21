const argon = require("argon2");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuarios.model")
const CarritoModel = require("../models/carrito.model");
const { registroExitoso } = require("../helpers/mensajes.nodemailer.helper");

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


const crearUsuarioService = async (body) => {
    console.log(body)
    if (!body.emailUsuario || !body.contraseniaUsuario) {
        return {
            msg: "Faltan emailUsuario o contrasenia",
            statusCode: 400
        };
    }

    const nuevoUsuario = new usuariosModel(body);
    const carritoUsuario = new CarritoModel({idUsuario: nuevoUsuario._id})
    nuevoUsuario.contraseniaUsuario = await argon.hash(body.contraseniaUsuario);
    nuevoUsuario.idCarrito = carritoUsuario._id

    const res= await registroExitoso(body.emailUsuario, body.nuevoUsuario)

    await nuevoUsuario.save();
    await carritoUsuario.save();
    

    return {
        msg: "usuario creado con exito",
        statusCode: 201
    };
}


const iniciarSesionService = async (body) => {
     console.log(body)

    const usuarioExiste = await usuariosModel.findOne({ emailUsuario: body.emailUsuario });

    if (!usuarioExiste) {
        return {
            msg: "usuario o contraseña incorrecta User",
            statusCode: 400,
        }
    }

    const passCheck = await argon.verify(usuarioExiste.contraseniaUsuario, body.contraseniaUsuario)
    if (!passCheck) {
        return {
            msg: "usuario o contraseña incorrecta Pass",
            statusCode: 400,
        }
    }
        const payload = {
        idUsuario : usuarioExiste._id,
        idCarrito : usuarioExiste.idCarrito,
        rolUsuario : usuarioExiste.rolUsuario

}

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1h"})
    
    return {
        msg: "usuario logeado",
        token,
        statusCode: 200,
    }
}



module.exports = { obtenerTodosLosUsuariosService, obteneUsuriosPorIdService, crearUsuarioService,iniciarSesionService }
