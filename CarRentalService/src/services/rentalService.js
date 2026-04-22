const bookingRepo = require("../repos/bookingRepo");
const branchRepo = require("../repos/branchRepo");
const carRepo = require("../repos/carRepo");
const { parseTime, hoursBetween, overlaps } = require("../utils/time");


function createBranch({name, location, pricing}){
   return branchRepo.create({name, location, pricing});
}
function addCarToBranch({branchId, carType, registrationNo}){
        const branch = branchRepo.get(branchId)
        if (!branch) return res.status(404).json({ error: 'branch not found' })
        if (!carType || !registrationNo) return res.status(400).json({ message: 'CarType and registrationNo are erquired' })
        const c = carRepo.create({
            branchId: branchId,
            carType,
            registrationNo
        })
        branch.carIds.add(c.id);
        return c;
}

function searchAvailable({ branchId, carType, start, end }) {
    const branch = branchRepo.get( branchId );
    if (!branch) throw new Error('Branch not found');
    const s = parseTime(start);
    const e = parseTime(end);
    if (e < s) throw new Error('Start Date must be before End Date');

    let out = [];
    for (const carId of branch.carIds) {
        const car = carRepo.get(carId);
        if (!car) continue;
        if (car.carType !== carType) continue;

        let conflict = false;
        for (const bookingId of car.bookingIds) {
            const b = bookingRepo.get(bookingId);
            if (!b || b.status !== 'ACTIVE') continue;
            if (overlaps(b.startTime, b.endTime, s, e)) {
                conflict = true;
                break;
            }
        }
        if (!conflict) out.push(car);
    }
    return out;
}

function createBooking({ userId, branchId, carType, start, end }) {

    const branch = branchRepo.get(branchId); 
    if (!branch) throw new Error('Branch not found');
    const s = parseTime(start);
    const e = parseTime(end);
    if (e < s) throw new Error('Start Date must be before End Date');

    let selectedCar = null;
    for (const carId of branch.carIds) {
        const car = carRepo.get(carId);
        if (!car) continue;
        if (car.carType !== carType) continue;

        let conflict = false;
        for (const bookingId of car.bookingIds) {
            const b = bookingRepo.get(bookingId);
            if (!b || b.status !== 'ACTIVE') continue;
            if (overlaps(b.startTime, b.endTime, s, e)) {
                conflict = true;
                break;
            }
        }
        if (!conflict) { selectedCar = car; break }

    }

    if (!selectedCar) throw new Error('No available cars');

    //compute pricing
    const rate = branch.pricing[carType];
    if (typeof rate !== 'number') throw new Error('Pricing is not configured for this Car');

    const price = Math.round(rate * (hoursBetween(e, e)) * 100) / 100;

    //persist the booking and link to the car
    const booking = bookingRepo.create({
        carId: selectedCar.id,
        userId,
        startTime:s,
        endTime:e,
        price
    });
    selectedCar.bookingIds.add(booking.id);
    selectedCar.status = 'BOOKED'

    return { booking, car: selectedCar }
}

function returnCar( {bookingId} ) {
    const booking = bookingRepo.get(bookingId);
    if (!bookingId) throw new Error('Booking not found');
    if (booking.status !== 'ACTIVE') throw new Error('Booking is not active');

    //update booking status
    booking.status = 'COMPLETED'

    //update car avalability
    const car = carRepo.get(booking.carId);
    if (!car) throw new Error('No car Associated with this booking');

    let hasActive = false;
    for (const bookingId of car.bookingIds) {
        const b = bookingRepo.get(bookingId);
        if (b && b.status == 'ACTIVE') hasActive = true; break;
    }
    if (!hasActive) car.status = 'AVAILABLE'
    return { booking, car };
}

function getAllBookings(){
    return bookingRepo.list();
}

module.exports = { createBranch,addCarToBranch,  searchAvailable, createBooking, returnCar, getAllBookings }