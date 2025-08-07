const mongoose = require('mongoose');
const {ListaDeProductosServices,ObtenerProductoPorIdService,CrearProductoService,ActalizarUnProductoPorIdService, EliminarProductoService}= require("../services/productos.services")


const ListaDeProductos = async (req , res)=>{
    const{productos,statusCode}= await ListaDeProductosServices(req);
    res.status(statusCode).json({productos})
}


const ObtenerProductoPorId = async (req , res)=>{
    const{producto,statusCode}= await ObtenerProductoPorIdService( req.params.id,
    req.body);
    res.status(statusCode).json({producto})
}

const CrearProducto = async (req , res)=>{
    const{msg,statusCode}= await CrearProductoService(req.body);
    res.status(statusCode).json({msg})
    
}

const ActalizarUnProductoPorId = async (req, res) => {
  
  const { msg, statusCode } = await ActalizarUnProductoPorIdService(req.params.id,
    req.body);
  
  res.status(statusCode,).json({ msg });
};

const EliminarProducto = async (req,res)=>{
const {statusCode,msg} = await EliminarProductoService (req.params.id)
res.status(statusCode).json({msg})
}


module.exports={ListaDeProductos, ObtenerProductoPorId,CrearProducto,ActalizarUnProductoPorId,EliminarProducto}