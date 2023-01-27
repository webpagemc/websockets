const express = require("express");
const viewsRouter = express.Router();
const { productManager } = require("../controllers/ProductManager");

viewsRouter.get("/", (req, res) => {
  let products = productManager.readFile();
  res.render("index", { products, styles: "index" });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {  styles: "realTimeProducts" });
  } )

module.exports.viewsRouter = viewsRouter;
