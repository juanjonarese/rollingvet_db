const jwt = require("jsonwebtoken");

module.exports = (rolUsuario) => (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  try {
    const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verificarUsuario);

    if (rolUsuario === verificarUsuario.rolUsuario) {
      req.idCarrito = verificarUsuario.idCarrito;
      req.idUsuario = verificarUsuario.idUsuario;
      next();
    } else {
      res.status(401).json({ msg: "No estás autorizado" });
    }
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    res.status(401).json({ msg: "Token no válido o expirado" });
  }
};
