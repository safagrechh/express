var express = require('express');
var router = express.Router();
const products = require("../products.json")

   router.get('/', function(req, res, next) {
    res.json(products);
   });

   router.get('/:id', function(req, res, next) {
    res.json(products[req.params.id]);
   });

   router.get('/instock/:qt', function(req, res, next) {
    // res.json(products[req.params.id]);
      res.json(Object.values(products).filter( prod => prod.stock >= req.params.qt))
    });
  
   router.get('/:id/:qt', function(req, res, next) {
   // res.json(products[req.params.id]);
   //const totalprice = products[req.params.id].price * req.params.qt
   });


  

module.exports = router;