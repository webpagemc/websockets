const socket = io();
const productsRealTime = document.querySelector("#productsRealTime");

//Creamos una funcion la cual se encarga de renderizar los productos en el HTML una vez que escucha el "message"
//desde el socket del servidor.
const cargarProductos = () => { 

  socket.on("message",(data) => {
    
    productsRealTime.innerHTML = "";
    data.forEach(function(e){
      productsRealTime.innerHTML += `
    <ul>
      <li><h3>Nombre: ${e.title}</h3></li>
      <li>Description: ${e.description} </li>
      <li>Precio: ${e.price} </li>
      <li>Imagenes: ${e.thumbnail} </li>
      <li>Codigo: ${e.code} </li>
      <li>Stock: ${e.stock} </li>
      <li>ID: ${e.id} </li>
   </ul>
      `; 
  })}
);
}


//Ejecutamos la funcion para que los productos se vean a penas el usuario ingrese a /realtimeproducts
cargarProductos()

//Agregar un Producto
document.querySelector(".formulario").addEventListener("submit", (e) => {

    e.preventDefault();

    let producto = {

      title: document.querySelector("#nombre").value,
      description: document.querySelector("#descripcion").value,
      price: document.querySelector("#precio").value,
      thumbnail: document.querySelector("#url").value,
      code: document.querySelector("#codigo").value,
      status: true,
      stock: document.querySelector("#stock").value

    };

    socket.emit("productoNuevo", producto);
    socket.on("products", cargarProductos());
    
});

//Eliminar un Producto
document.querySelector(".formularioEliminar").addEventListener("submit", (e) => {

    e.preventDefault();

    let idEliminar = Number(document.querySelector("#idDelete").value)
    socket.emit("idEliminar", idEliminar);
    
});



