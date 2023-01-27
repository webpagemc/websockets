const express = require("express");
const app = express();
const cartRouter = express.Router();
const { cartManager } = require("../controllers/CartManager");

cartRouter.get("/:cid", function (req, res) {
  let cart = cartManager
    .readFile()
    .find((e) => e.id === Number(req.params.cid));
  res.send(cart);
});

cartRouter.post("/", (req, res) => {
   cartManager.addCart();
      res.send("Cart Add success");
  });

  cartRouter.post("/:cid/product/:pid", (req, res) => {
    const carritoId = +req.params.cid;
    const productoId = +req.params.pid;
      let cart = cartManager.readFile().find((e) => e.id === carritoId);
    
     
      if (cart) {      
        cartManager.addProductCart(carritoId,productoId) 
        res.send("Cart Add success");
    } else {
      res.status("400").send("Server Error");
    }
  });


cartRouter.delete('/delete/:id', (req, res) => {
	cartManager.deleteCart(Number(req.params.id));
		res.send("Cart Delete success");	
});


module.exports.cartRouter = cartRouter;