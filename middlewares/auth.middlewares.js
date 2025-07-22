const jwt = require("jsonwebtoken")
const { model } = require("mongoose")

module.exports= (rolUsuario)=>(req,res,next) => {
const token= req.header("Authorization")
const verificarUsuario =jwt.verify(token,process.env.JWT_SECRET)
console.log(verificarUsuario)

if(rolUsuario===verificarUsuario.rolUsuario){
    req.idCarrito= verificarUsuario.idCarrito
    req.idUsuario= verificarUsuario.idUsuario
    next()
}else{
    res.status(401).json({msg:"no estas autorizado"})
}

}