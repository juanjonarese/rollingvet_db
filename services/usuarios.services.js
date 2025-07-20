const argon = require("argon2");
const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuarios.model");
const CarritoModel = require("../models/carrito.model");

const obtenerTodosLosUsuariosService = async () => {
    const usuarios = await usuariosModel.find();
    return {
        usuarios,
        statusCode: 200
    };
};

const obtenerUsuarioPorIdService = async (idUsuario) => {
    const usuario = await usuariosModel.findById(idUsuario);
    return {
        usuario,
        statusCode: 200
    };
};

const crearUsuarioService = async (body) => {
    if (!body.emailUsuario || !body.contrasenia) {
        return {
            msg: "Faltan emailUsuario o contrasenia",
            statusCode: 400
        };
    }

    const nuevoUsuario = new usuariosModel(body);
    const carritoUsuario = new CarritoModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.contrasenia = await argon.hash(body.contrasenia);
    nuevoUsuario.idCarrito = carritoUsuario._id;

    await nuevoUsuario.save();
    await carritoUsuario.save();

    return {
        msg: "usuario creado con éxito",
        statusCode: 201
    };
};

const iniciarSesionService = async (body) => {
    const usuarioExiste = await usuariosModel.findOne({ emailUsuario: body.emailUsuario });

    if (!usuarioExiste) {
        return {
            msg: "usuario o contraseña incorrecta (usuario)",
            statusCode: 400,
        };
    }

    const passCheck = await argon.verify(usuarioExiste.contrasenia, body.contrasenia);
    if (!passCheck) {
        return {
            msg: "usuario o contraseña incorrecta (password)",
            statusCode: 400,
        };
    }

    const payload = {
        idUsuario: usuarioExiste._id,
        idCarrito: usuarioExiste.idCarrito,
        rolUsuario: usuarioExiste.rolUsuario
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return {
        msg: "usuario logueado",
        token,
        statusCode: 200
    };
};

module.exports = {
    obtenerTodosLosUsuariosService,
    obtenerUsuarioPorIdService,
    crearUsuarioService,
    iniciarSesionService
};
