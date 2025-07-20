const { agregarProductosCarritoServices } = require("../services/carritos.services");

const agregarProductosCarrito = async(req,res) => {

try {
    const{statusCode,msg, error} = await agregarProductosCarritoServices(req.idCarrito, req.params.idProducto);
    res.status(statusCode).json({msg})

} catch  {
    res.status(statusCode).json({error})
}

}

module.exports= {agregarProductosCarrito};