var express = require('express')
var router = express.Router();
var Employe = require('../Models/Employe')
var io = require('../socketConfig');

function validateRank(req, res, next) {
    const rank = req.body.Rank;
    if (![1, 2, 3].includes(rank)) {
        return res.status(400).json({ message: 'Rank must be 1, 2, or 3' });
    }
    next(); // Call next if validation passes
}

const addEmploye = async (req, res, next) => {
    const { FullName, Rank, Salary } = req.body;
    
    try {
        const EData = new Employe({ FullName, Rank, Salary });
        await EData.save();
        res.json({
            message: "Employee successfully added!"
        });
    } catch (error) {
        next(error); // Handle other errors
    }
};

const ShowEmployees = async (req, res, next) => {
    const es = await Employe.find();
    res.json(es);  
};

const getEmployeById =  async (req,res,next)=>{
    const e = await Employe.findById(req.params.id);
    res.json(e);
}

const deleteEmployeById =  async (req,res,next)=>{
    const e = await Employe.findByIdAndDelete(req.params.id);
    res.json("deleted sucessfully" + e);
}

const updateEmploye = async (req,res,next)=>{
    try {
      const e = await Employe.findByIdAndUpdate(req.params.id , req.body) ;
      if(!e){
        return res.status(404).json({message : 'no employe'})
      } 
    } catch (error) {
        res.status(500).json({message : error.message})   
    }

   
}

const searchByName =  async (req,res,next)=>{
    try {
        const name = req.params.name;
        const employees = await Employe.find({ FullName: name });

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found with the given name' });
        }

        res.json(employees);
    } catch (error) {
        next(error); // Handle errors
    }
}

const increaseSalary = async (req, res, next) => {
    try {
        const e = await Employe.findById(req.params.id);
        if (!e) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update salary
        e.Salary = e.Salary * (1 + req.body.percentage / 100);
        await e.save();
        io.emit('salaryAlert', { id: req.params.id });

        res.json({
            message: "Salary increased successfully"
        });
    } catch (error) {
        next(error); // Handle errors
    }
};
router.get("/chat" , async(req, res, next) => {
 res.render("chat")
})
router.get('/SearchByName/:name',searchByName ); 
router.get('/ShowEmployees',ShowEmployees );
router.put('/increaseSalary/:id',increaseSalary ) ;
router.post('/AddEmploye',validateRank,addEmploye ) ;
router.get('/showEmploye/:id',getEmployeById);
router.delete('/DeleteEmploye/:id',deleteEmployeById ) 
router.put('/UpdateEmploye/:id' ,updateEmploye) 
module.exports = router;