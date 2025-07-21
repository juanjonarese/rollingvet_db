const { transporter } = require("../middlewares/nodemailer.middleware");

const registroExitoso= async (emailUsuario, nombreUsuario)=> {
try {
    
    const info = await transporter.sendMail({
    from: `"RollingVet" <${process.env.GMAIL_APP_USER}>`,
    to: `${emailUsuario}`,
    subject: "Registro exitoso ✔",
    text: "Gracias por registrarte", // plain‑text body
    html: `<b>Bienvenido ${nombreUsuario}</b>
    

    
    `, // HTML body
  });

  console.log(info);
}

 catch (error) {
    console.log({error})
}
}
module.exports = {registroExitoso}