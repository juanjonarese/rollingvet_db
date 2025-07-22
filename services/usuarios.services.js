const argon = require("argon2");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuarios.model")
const CarritoModel = require("../models/carrito.model")



const crearUsuarioService = async (body) => {
    try {
        // Validar campos requeridos
        if (!body.emailUsuario || !body.contraseniaUsuario) {
            return {
                msg: "Faltan emailUsuario o contraseniaUsuario",
                statusCode: 400
            };
        }

        // Validar formato de email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.emailUsuario)) {
            return {
                msg: "El formato del email no es válido",
                statusCode: 400
            };
        }

        // Validar longitud mínima de contraseña
        if (body.contraseniaUsuario.length < 6) {
            return {
                msg: "La contraseña debe tener al menos 6 caracteres",
                statusCode: 400
            };
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await usuariosModel.findOne({ emailUsuario: body.emailUsuario });
        if (usuarioExistente) {
            return {
                msg: "Ya existe un usuario con este email",
                statusCode: 409
            };
        }

        // Crear el carrito primero para obtener su ID
        const carritoUsuario = new CarritoModel();
        await carritoUsuario.save();

        // Hashear la contraseña
        const contraseniaHasheada = await argon.hash(body.contraseniaUsuario);

        // Crear el usuario con la contraseña hasheada
        const nuevoUsuario = new usuariosModel({
            ...body,
            contraseniaUsuario: contraseniaHasheada,
            idCarrito: carritoUsuario._id
        });

        // Actualizar el carrito con el ID del usuario
        carritoUsuario.idUsuario = nuevoUsuario._id;
        await carritoUsuario.save();

        // Guardar el usuario
        await nuevoUsuario.save();

        return {
            msg: "Usuario creado con éxito",
            statusCode: 201,
            usuario: {
                id: nuevoUsuario._id,
                emailUsuario: nuevoUsuario.emailUsuario,
                rolUsuario: nuevoUsuario.rolUsuario,
                idCarrito: nuevoUsuario.idCarrito
            }
        };

    } catch (error) {
        console.error('Error en crearUsuarioService:', error);
        
        // Si es un error de duplicado de MongoDB
        if (error.code === 11000) {
            return {
                msg: "Ya existe un usuario con este email",
                statusCode: 409
            };
        }

        return {
            msg: "Error interno del servidor",
            statusCode: 500
        };
    }
}



module.exports = {  crearUsuarioService }