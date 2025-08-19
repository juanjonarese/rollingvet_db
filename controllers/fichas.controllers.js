const {
    obtenerFichasService,
    obtenerFichaPorIDService,
    crearFichaService,
    actualizarFichaService,
    eliminarFichaService
} = require("../services/fichas.services.js")

const obtenerFichas = async (req, res) => {
    try{
        const {fichas, statusCode} = await obtenerFichasService()
        res.status(statusCode).json({fichas})
    }catch (error){
        console.error('Error al obtener las fichas', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const obtenerFichaPorID = async (req, res) => {
    try{
        const {ficha, statusCode} = await obtenerFichaPorIDService(req.params.id)
        res.status(statusCode).json({ficha})
    }catch (error){
        console.error('Error al obtener la ficha', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const crearFicha = async (req, res) => {
    try{
        const {msg, idFicha, statusCode} = await crearFichaService(req.body)
        res.status(statusCode).json({msg, idFicha})
    }catch (error){
        console.error('Error al crear la ficha', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const actualizarFicha = async (req, res) => {
    try{
        const {msg, statusCode} = await actualizarFichaService(req.params.id, req.body)
        res.status(statusCode).json({msg})
    }catch (error){
        console.error('Error al actualizar la fichas', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const eliminarFicha = async (req, res) => {
    try{
        const {msg, statusCode} = await eliminarFichaService(req.params.id)
        res.status(statusCode).json({msg})
    }catch (error){
        console.error('Error al eliminar la fichas', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

module.exports = {
    obtenerFichas,
    obtenerFichaPorID,
    crearFicha,
    actualizarFicha,
    eliminarFicha
}