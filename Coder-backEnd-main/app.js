const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const PORT = 8080;
const { Server } = require("socket.io")
const { productManager } = require("./controllers/ProductManager");
const { productsRouter } = require("./routers/productsRouter");
const { cartRouter } = require("./routers/cartsRouter");
const {viewsRouter} = require("./routers/views.router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(PORT, () => console.log(`Escuchando en ${PORT}`));
const socketServer = new Server(httpServer)

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);



//Conexion entre sockets//
socketServer.on("connection", socket => {

//Cargar Productos
    let products = productManager.readFile()
    socket.emit("message", products) 

//Cargar Nuevo Producto
    socket.on("productoNuevo", (data)=>{ 

       productManager.addProduct(data)
       let products = productManager.readFile()
       socket.emit("message", products)

    })

//Eliminar un Producto
    socket.on("idEliminar", (data)=>{

        productManager.deleteProduct(data)
        socket.emit("message",products)

    })
    
})




