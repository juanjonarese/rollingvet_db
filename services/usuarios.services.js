const argon = require("argon2");
const { token } = require("morgan");
const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuarios.model")
const carritoMascotas = require("../models/carritoMascotas.model")
const { registroExitoso } = require("../helpers/mensajes.nodemailer.helper"); 
const { recuperarContrasenia } = require("../helpers/mensajes.nodemailer.helper");




const crearUsuarioService = async (body) => {
    try {
        // Validar campos requeridos
        if (!body.emailUsuario || !body.contraseniaUsuario) {
            return {
                msg: "Faltan emailUsuario o contraseniaUsuario",
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
        const carritoUsuario = new carritoMascotas();
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

        //envio el mail de confirmacion
        registroExitoso (body.emailUsuario, body.nombreUsuario)

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
    

        return {
            msg: "Error interno del servidor",
            statusCode: 500
        };
    }
}


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
                msg: "usuario o contraseña incorrecta",
                statusCode: 400,
            }
        }

        // Comprobar si la contraseña existe 
        if (!usuarioExiste.contraseniaUsuario) {
          
            return {
                msg: "Error en la cuenta del usuario. Contacte al administrador.",
                statusCode: 400,
            }
        }

        const passCheck = await argon.verify(usuarioExiste.contraseniaUsuario, body.contraseniaUsuario)
        // console.log('Resultado de verificación:', passCheck)
        
        if (!passCheck) {
            return {
                msg: "usuario o contraseña incorrecta",
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
            rolUsuario: usuarioExiste.rolUsuario,
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

const recuperarContraseniaUsuarioServices = async (emailUsuario) => {
  try {
    // console.log(emailUsuario);
    const usuarioExiste = await usuariosModel.findOne({ emailUsuario });
    // console.log(usuarioExiste);

    if (usuarioExiste) {
      const payload = {
        idUsuario: usuarioExiste._id,
      };

      const tokenRecuperarContrasenia = jwt.sign(
        payload,
        process.env.JWT_SECRET_RECOVERY_PASS
      );

      await recuperarContrasenia(
        tokenRecuperarContrasenia,
        usuarioExiste.emailUsuario
      );

      return {
        msg: "Mail enviado",
        statusCode: 200,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const cambioDeContraseniaUsuarioTokenServices = async (
  token,
  nuevaContrasenia
) => {
//   console.log("token services", token);
//   console.log("pass services", nuevaContrasenia);
  try {
    const verificarUsuario = jwt.verify(
      token,
      process.env.JWT_SECRET_RECOVERY_PASS
    );

    const usuario = await usuariosModel.findOne({
      _id: verificarUsuario.idUsuario,
    });

    if (!usuario) {
      return {
        msg: "Usuario no encontrado o token inválido",
        statusCode: 404,
      };
    }

    usuario.contraseniaUsuario = await argon.hash(nuevaContrasenia);
    await usuario.save();

    return {
      msg: "Cambio de contraseña exitoso",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = { obtenerTodosLosUsuariosService, obteneUsuriosPorIdService, iniciarSesionService, crearUsuarioService, recuperarContraseniaUsuarioServices, cambioDeContraseniaUsuarioTokenServices}

