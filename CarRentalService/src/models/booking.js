class Booking {
    constructor({id, carId,userId, startTime, endTime, price}){
        this.id = id;
        this.carId = carId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.status = 'ACTIVE'
        this.createdAt = new Date();
        this.returnedAt = null;
    }
}

module.exports = Booking