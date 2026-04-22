const express = require('express');
const carRepo = require('../repos/carRepo');


const router = express.Router();



router.get('/', (req, res) => {
    const cars = carRepo.list();
    const arr = cars.map(car => ({
        ...car,
        bookingIds : Array.from(car.bookingIds)
    }))
    res.json(cars);
});

router.get('/:id', (req, res) => {

    try {
        const car = carRepo.get(req.params.id)
        if (!car) return res.status(404).json({ error: 'car not found' })
        res.json(c);
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
});

module.exports = router