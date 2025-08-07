const express = require("express")
const {ListaDeProductos, ObtenerProductoPorId,CrearProducto,ActalizarUnProductoPorId,EliminarProducto} = require("../controllers/productos.controllers")
// const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.get ("/" ,ListaDeProductos)
router.get ("/:id", ObtenerProductoPorId)
router.post ("/", CrearProducto)
router.put ("/:id", ActalizarUnProductoPorId)
router.delete ("/:id", EliminarProducto)

module.exports = router  