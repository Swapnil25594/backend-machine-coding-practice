const express = require('express');
const branchRepo = require('../repos/branchRepo');
const carRepo = require('../repos/carRepo');
const rentalService= require('../services/rentalService');

const router = express.Router();


router.post('/', (req, res) => {
    try {
        const { name, location, pricing } = req.body;

        if (!name || !pricing) return res.status(400).json({ message: 'Name and Pricing are erquired' })
        b = branchRepo.create({ name, location, pricing });
        res.json(b);
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
});


router.get('/', (req, res) => {
    const branches = branchRepo.list();
    const arr = branches.map(branch => ({
        ...branch,
        carIds : Array.from(branch.carIds)
    }))
    res.json(arr);
});

router.post('/:id/cars', (req, res) => {

    try {
        const { carType, registrationNo } = req.body;
        const branch = branchRepo.get(req.params.id)
        if (!branch) return res.status(404).json({ error: 'branch not found' })
        if (!carType || !registrationNo) return res.status(400).json({ message: 'CarType and registrationNo are erquired' })
        const c = carRepo.create({
            branchId: req.params.id,
            carType,
            registrationNo
        })
        console.log('Branch before adding car:', branch.carIds);
        branch.carIds.add(c.id.toString());
console.log('Branch after adding car:', branch.carIds);
console.log('Branch from repo.get():', branchRepo.get(branch.id).carIds);
        return res.json(c);
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
});

router.get('/:id/available', (req, res) => {

    try {
        const { carType, start, end } = req.query;
        const branch = branchRepo.get(req.params.id)
        if (!branch) return res.status(404).json({ error: 'branch not found' })
        if (!carType || !start || !end) {
            return res.status(400).json({ error: "carType, start, end required" });
          }
        const cars = rentalService.searchAvailable({
            branchId: req.params.id,
            carType,
            start, 
            end
        })
         res.json(cars);
    }
    catch (e) {
        return res.status(400).json({ message: e.message })
    }
});

module.exports = router