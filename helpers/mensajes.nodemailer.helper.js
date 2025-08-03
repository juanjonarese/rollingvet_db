const { transporter } = require("../middlewares/nodemailer.middleware");

const registroExitoso= async (emailUsuario, nombreUsuario)=> {

 
try {
    
    await transporter.sendMail({
    from: `"RollingVet" <${process.env.GMAIL_APP_USER}>`,
    to: `${emailUsuario}`,
    subject: "Registro exitoso ✔",
    text: "Gracias por registrarte", // plain‑text body
    html: `<b>Bienvenido ${nombreUsuario}</b>
    

    
    `, // HTML body
  });

  
  return{
    msg: "ok",
    statusCode: 200,
    
  }  
  
  }

 catch (error){
  console.log(error)
   return{
    error,
    statusCode: 500,
   
   }

  }
}


const recuperarContrasenia= async (token, emailUsuario)=> {
try {
    
    const info = await transporter.sendMail({
    from: `"RollingVet" <${process.env.GMAIL_APP_USER}>`,
    to: `${emailUsuario}`,
    subject: "Recuperacion contraseña ****",
   
    html: `
    <b>Para ecuperar tu contraseña hace click en el link a continuacion:</b>
    <a href="http://localhost:5173/changepass"${token}>Ir a la página </a>
    

    
    `, // HTML body
  });
  console.log(info);
  return{
    msg: "ok",
    statusCode: 200,
  }
    
  
}

 catch (error) {
  console.log({error})
   return{
    error,
    statusCode: 500,
   
   }

}
}



module.exports = {registroExitoso, recuperarContrasenia}