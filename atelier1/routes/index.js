var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("params", req.query['title'])
  res.render('index', { title: req.query['title'] });
});

module.exports = router;
