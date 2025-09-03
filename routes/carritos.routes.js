const { Router } = require("express");
const {
  agregarProductosCarrito,
  eliminarProductoCarritioId,
  obtenerTodosLosProductosDelCarrito,
  pagarCarritoMp,
} = require("../controllers/carritos.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = Router();

router.get("/", authMiddleware("usuario"), obtenerTodosLosProductosDelCarrito);

router.put(
  "/agregarProducto/:idProducto",
  authMiddleware("usuario"),
  agregarProductosCarrito
);
router.put(
  "/eliminarProducto/:idProducto",
  authMiddleware("usuario"),
  eliminarProductoCarritioId
);

router.post("/pagarCarritoMp", pagarCarritoMp);
module.exports = router;
