const express = require('express');
const router = express.Router();
const Program = require('../models/program.js')

router.get('/', all_programs, (req, res, next) => {
    res.json({status: true, data: res.programs});
});


router.get('/:name', search, (req, res, next) => {
    res.json({ status: true, data: res.programs });
}); 


router.post('/', (req, res) => {
    const program = new Program({
        name: req.body.name,
        duration: req.body.duration,
        development_stack: req.body.development_stack,
        pricing: req.body.pricing
    });

    try {
        const new_program = program.save();
        res.json({status: true, message: "Entry successful"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}); 

async function all_programs(req, res, next) {
    try {
        programs = await Program.find();
        if(programs == null) {
            res.status(404).json({ message: 'Not results!!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.programs = programs;
    next();
}

 async function search(req, res, next) {
    try {
        programs = await Program.find({
            name: {
                $regex: req.params.name, $options: 'i'
            } 
        });

        if(programs == null) {
            res.status(404).json({message: 'Programs Not Found'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message})
    }

    res.programs = programs;
    next();
} 


module.exports = router;