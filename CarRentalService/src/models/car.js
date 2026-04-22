class Car{
    constructor({id, branchId, carType, registrationNo}){
        this.id = id;
        this.carType = carType;
        this.registrationNo = registrationNo;
        this.bookingIds = new Set();
        this.status = 'AVAILABLE'
    }
}

module.exports = Car;