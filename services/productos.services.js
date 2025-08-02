const { body } = require("express-validator")
const ProductosModel = require ("../models/productos.model")
const { MercadoPagoConfig, Preference } = require ('mercadopago');

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
  };
};

const mercadoPagoServices = () => {
  const client = new MercadoPagoConfig({ accessToken: `${process.env.ACCESS_TOKEN_MP}` });

  const preference = new Preference(client);

preference.create({
  body: {

    items: [
      {
        title: 'Mi producto',
        quantity: 1,
        unit_price: 2000,
        currency_id: 'ARS',
      }
    ],
    back_urls: {
      success: 'Aqui la url del sitio web con el pago exitoso',
      failure: 'Aqui la url del sitio web con el pago fallido',
      pending: 'Aqui la url del sitio web con el pago pendiente'
      // las backs urls deben estar deployadas desde el frontend
    },
    auto_return: "approved",
  }
})
};

module.exports={
    ListaDeProductosServices,
    ObtenerProductoPorIdService,
    CrearProductoService,
    ActalizarUnProductoPorIdService,
    EliminarProductoService,
}