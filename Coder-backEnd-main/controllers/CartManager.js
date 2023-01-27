const fs = require("fs");
const { productManager } = require("./ProductManager");
class CartManager {
  path;
  constructor(path) {
    this.path = path;
    this.carts = this.readFile();
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

  addCart() {
    let carts = this.readFile();
    let cart = {
      products: [],
      id: 1,
    };
    if (carts.length === 0) {
      this.carts.push(cart);
      this.writeData(this.carts);
    } else if (carts.length > 0) {
      let idNew = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      let cart = {
        products: [],
        id: idNew,
      };
      this.carts.push(cart);
      this.writeData(this.carts);
    }
  }
  getCartById(id) {
    let idItem = this.readFile().find((e) => e.id === id);
    if (idItem) {
      return console.log(idItem);
    }
    console.log("ID not found");
  }
  addProductCart(cid, pid) {
    let dataCarts = this.readFile();
    let cart = dataCarts.find((e) => e.id === cid);
    let productInCart = cart.products;

    let dataProducts = productManager.readFile();
    let product = dataProducts.find((e) => e.id === pid);
    let productSelect = product.id;
    let searchProduct = productInCart.find((e) => e.product === pid)
      if(productInCart.length === 0){
      let cartUpdate = {
        id: cart.id,
        products: [{ product: productSelect, quantity: 1 }],
      };

      let cartsSave = dataCarts.filter((e) => e.id != cid);
      let cartsNew = [];
      cartsNew.push(...cartsSave, cartUpdate);
      this.writeData(cartsNew);

    }
    else if (searchProduct){
      let productsSave = productInCart.filter((e) => e.product != pid);
      let newQuantity =  searchProduct.quantity + 1
      if (productsSave.length){
        let cartUpdate = {
          id: cart.id,
          products: [...productsSave,{ product: productSelect, quantity: newQuantity }],
        };
        console.log(cartUpdate)
        let cartsSave = dataCarts.filter((e) => e.id != cid);
        let cartsNew = [];
        cartsNew.push(...cartsSave, cartUpdate);
        this.writeData(cartsNew);  
      }
      else {
        let cartUpdate = {
          id: cart.id,
          products: [{ product: productSelect, quantity: newQuantity }],
        };
        let cartsSave = dataCarts.filter((e) => e.id != cid);
        let cartsNew = [];
        cartsNew.push(...cartsSave, cartUpdate);
        this.writeData(cartsNew);
      }
      
    }
    else{
      let cartUpdate = {
        id: cart.id,
        products: [...productInCart, { product: productSelect, quantity: 1 }],
      };
      
      let cartsSave = dataCarts.filter((e) => e.id != cid);
      let cartsNew = [];
      cartsNew.push(...cartsSave, cartUpdate);
      this.writeData(cartsNew);

    }
  }
  deleteCart(id) {
    let cart = this.readFile();
    let cartDelete = cart.filter((e) => e.id != id);
    if (cartDelete.length < cart.length) {
      this.writeData(cartDelete);
    } else {
      console.log("ID not found");
    }
  }
}

const cartManager = new CartManager("./database/carts.json");

module.exports = {
  cartManager: cartManager,
};
