const {
    obtenerFichasService,
    obtenerFichaPorIDService,
    crearFichaService,
    actualizarFichaService,
    eliminarFichaService
} = require("../services/fichas.services.js")

const obtenerFichas = async (req, res) => {
    const {fichas, statusCode} = await obtenerFichasService()
    res.status(statusCode).json({fichas})
}

const obtenerFichaPorID = async (req, res) => {
    const {ficha, statusCode} = await obtenerFichaPorIDService(req.params.id)
    res.status(statusCode).json({ficha})
}

const crearFicha = async (req, res) => {
    const {msg, idFicha, statusCode} = await crearFichaService(req.body)
    res.status(statusCode).json({msg, idFicha})
}

const actualizarFicha = async (req, res) => {
    const {msg, statusCode} = await actualizarFichaService(req.params.id, req.body)
    res.status(statusCode).json({msg})
}

const eliminarFicha = async (req, res) => {
    const {msg, statusCode} = await eliminarFichaService(req.params.id)
    res.status(statusCode).json({msg})
}

module.exports = {
    obtenerFichas,
    obtenerFichaPorID,
    crearFicha,
    actualizarFicha,
    eliminarFicha
}