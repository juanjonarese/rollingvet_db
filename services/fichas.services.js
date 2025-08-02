const FichasModel = require("../models/fichas.model.js");

const obtenerFichasService = async () => {
    const fichas = await FichasModel.find()
    return {
        fichas,
        statusCode: 200,
    }
}

const obtenerFichaPorIDService = async (idFicha) => {
    const ficha = await FichasModel.findOne({ _id: idFicha})
}

const crearFichaService = async (body) => {
    const nuevaFicha = new FichasModel(body)
    await nuevaFicha.save();
    return {
        msg: "Ficha generada exitosamente",
        idFicha: nuevaFicha._id,
        statusCode: 201,
    }
}

const actualizarFichaService = async (idFicha, body) => {
    await FichasModel.findByIdAndUpdate({ _id: idFicha}, body)
    return {
        msg: "Ficha actualizada exitosamente",
        statusCode: 200,
    }
}

const eliminarFichaService = async (idFicha) => {
    await FichasModel.findByIdAndDelete({ _id: idFicha})
    return {
        msg: "Ficha eliminada",
        statusCode: 200,
    }
}

module.exports = {
    obtenerFichasService,
    obtenerFichaPorIDService,
    crearFichaService,
    actualizarFichaService,
    eliminarFichaService
}