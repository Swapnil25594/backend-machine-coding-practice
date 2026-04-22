const express = require('express');
const branchRoutes = require('./routes/branchRoute');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json())

app.use('/branches',branchRoutes );
app.use('/cars',carRoutes );
app.use('/bookings',bookingRoutes );

//health
app.get('/', (req, res)=>{res.send({ok:true})});

module.exports = app;