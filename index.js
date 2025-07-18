require("./db/config.database");

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


app.use(express.json())
app.use(cors());
app.use(morgan("dev"));


// app.use("/productos", require("./routes/productos.routes"))
// app.use("/usuarios", require("./routes/usuarios.routes"))
// app.use("/carritos", require("./routes/carrito.routes"))

app.listen(8080, ()=>{
    console.log("servidor funcionando puerto",8080)
})