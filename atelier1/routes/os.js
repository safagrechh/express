var express = require('express');
var router = express.Router();
const os = require("os");

router.get('/', function(req, res, next) {
   // console.log("os.hostname()", os.hostname()) ; 
    res.json({
        hostname: os.hostname() , 
        type : os.type() ,
        platfom : os.platform(),
    });
});
router.get('/cpus', function(req, res, next) {
    // console.log("os.hostname()", os.hostname()) ; 
     res.json(
        os.cpus()
     );
 });
 router.get('/cpus/:id', function(req, res, next) {
    
     res.json(
        os.cpus().at(req.params.id) 
        
     );
 });


module.exports = router;