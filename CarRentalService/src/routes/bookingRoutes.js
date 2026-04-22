const express = require('express');
const bookingRepo = require('../repos/bookingRepo');
const rentalService = require('../services/rentalService');


const router = express.Router();


router.post('/', (req, res) => {
    try {
      const {userId, branchId, carType, start, end}  = req.body;
      if (!userId || !branchId || !carType || !start || !end) 
      return res.status(400).json({ message: 'userId, branchId, carType, start, end required' })
       const data = rentalService.createBooking({userId, branchId, carType, start, end});
       res.json(data);
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
});

router.post('/:id/return', (req, res) => {
    const result = rentalService.returnCar({ bookingId:req.params.id})
    res.json(b);
});


router.get('/:id', (req, res) => {
    const b = bookingRepo.get(req.params.id);
    if(!b) return res.status(400).json({ message: 'Booking not found' })
    res.json(b);
});


module.exports = router