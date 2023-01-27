const fs = require("fs");

class ProductManager {
  path;
  constructor(path) {
    this.path = path;
    this.products = this.readFile();
  }

  readFile() {
    const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    return data;
  }

  writeData(data) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync(`./${this.path}`, dataString);
    return dataString;
  }

  addProduct(item) {
    let items = this.readFile();
    if (items.find((e) => e.code === item.code)) {
      console.log("a CODE has already been assigned");
    } else if (
      !!!item.title ||
      !!!item.description ||
      !!!item.price ||
      !!!item.thumbnail ||
      !!!item.code ||
      !!!item.status ||
      !!!item.stock
    ) {
      console.log("All fields are required");
    } 
    else if (Object.keys(item).length > 7)
    {console.log("Fields must not exceed required")}
    else{
      item.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
      items.push(item);
      this.writeData(items);}
    
  }
  getProductById(id) {
    let idItem = this.readFile().find((e) => e.id === id);
    if (idItem) {
      return console.log(idItem);
    }
    console.log("ID not found");
  }
  updateProduct(id, product) {
    let data = this.readFile();
    if (data.find((product) => product.id === id)) {
      let productUpdate = data.filter((product) => product.id !== id);
      product.id = id;
      productUpdate.push(product);
      this.writeData(productUpdate);
      return productUpdate;
    } else {
      console.log("The product to be updated does not exist");
    }
  }
  deleteProduct(id) {
    let products = this.readFile();
    let productDelete = products.filter((e) => e.id != id)
    if (productDelete.length < products.length) {
      this.writeData(productDelete);
    }
    else{console.log("ID not found");} 
  }
  deleteAll() {
    this.writeData([]);
  }
}
const productManager = new ProductManager("./database/products.json");

module.exports ={
  productManager :  productManager 
}



/////////////////////////////////// SECTOR PRUEBAS ///////////////////////////////////

// console.log(productManager.readFile());
// productManager.addProduct(product);
// productManager.addProduct(teclado);
// productManager.addProduct(cocaCola);
// productManager.getProductById(2);
// productManager.updateProduct(1,{
//   title: "Redragon",
//   description: "Mouse Inalambrico 16000 Dpi",
//   price: 1000,
//   thumbnail: "Sin Imagen",
//   code: "Mouse123",
//   stock: 8,
// })
// productManager.deleteProduct(1)
// productManager.deleteAll()
