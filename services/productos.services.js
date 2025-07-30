const { body } = require("express-validator")
const ProductosModel = require ("../models/productos.model")

const ListaDeProductosServices= async ()=>{
    const productos = await ProductosModel.find()

    return{
        productos,
        statusCode:200
    }
}

const ObtenerProductoPorIdService = async (idProducto)=>{
const producto = await ProductosModel.findOne({_id: idProducto})
return{
    producto,
    statusCode:200
}
}

const CrearProductoService = async (body)=>{
    const producto = new ProductosModel(body)
    console.log(body)
    producto.save()
    return{
    msg: "Producto creado con exito",
    statusCode: 201,
    
}
}

const ActalizarUnProductoPorIdService = async (idProducto, body) => {
  const producto = await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body);
  return {
    msg:"Producto actualizado con exito",
    statusCode: 200,
  };
};


const EliminarProductoService = async (idProducto)=>{
    const producto = await ProductosModel.findByIdAndDelete({_id: idProducto});
     return {
    msg:"Producto actualizado con exito",
    statusCode: 200,
  }
}

module.exports={
    ListaDeProductosServices,
    ObtenerProductoPorIdService,
    CrearProductoService,
    ActalizarUnProductoPorIdService,
    EliminarProductoService
}