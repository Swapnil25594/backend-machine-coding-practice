// demo.js
// Run with: node demo.js
const rentalService = require("./services/rentalService");
const branchRepo = require("./repos/branchRepo");
const carRepo = require("./repos/carRepo");

// Helper to print current state
function printState() {
  console.log("\n--- Branches ---");
 branchRepo.list().forEach(branch => {
    console.log({
      ...branch,
      carIds: Array.from(branch.carIds)
    });
  });

  console.log("\n--- Cars ---");
  carRepo.list().forEach(car => console.log(car));

  console.log("\n--- Bookings ---");
  console.log(rentalService.getAllBookings());
}

// 1️⃣ Create 3 branches
const branch1 = rentalService.createBranch({
  name: "MG Road",
  location: "Bengaluru",
  pricing: { SEDAN: 100, SUV: 150 }
});

const branch2 = rentalService.createBranch({
  name: "Indiranagar",
  location: "Bengaluru",
  pricing: { SEDAN: 120, SUV: 180 }
});

const branch3 = rentalService.createBranch({
  name: "Koramangala",
  location: "Bengaluru",
  pricing: { SEDAN: 90, SUV: 140 }
});

// 2️⃣ Add 8 cars across branches
const cars = [
  rentalService.addCarToBranch({ branchId: branch1.id, carType: "SEDAN", registrationNo: "KA01AA0001" }),
  rentalService.addCarToBranch({ branchId: branch1.id, carType: "SUV", registrationNo: "KA01AA0002" }),
  rentalService.addCarToBranch({ branchId: branch2.id, carType: "SEDAN", registrationNo: "KA01BB0001" }),
  rentalService.addCarToBranch({ branchId: branch2.id, carType: "SUV", registrationNo: "KA01BB0002" }),
  rentalService.addCarToBranch({ branchId: branch2.id, carType: "SUV", registrationNo: "KA01BB0003" }),
  rentalService.addCarToBranch({ branchId: branch3.id, carType: "SEDAN", registrationNo: "KA01CC0001" }),
  rentalService.addCarToBranch({ branchId: branch3.id, carType: "SEDAN", registrationNo: "KA01CC0002" }),
  rentalService.addCarToBranch({ branchId: branch3.id, carType: "SUV", registrationNo: "KA01CC0003" }),
];

// 3️⃣ Create some bookings
const now = new Date();
const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

const booking1 = rentalService.createBooking({
  userId: "u1",
  branchId: branch1.id,
  carType: "SEDAN",
  start: now.toISOString(),
  end: oneHourLater.toISOString()
});

const booking2 = rentalService.createBooking({
  userId: "u2",
  branchId: branch2.id,
  carType: "SUV",
  start: now.toISOString(),
  end: twoHoursLater.toISOString()
});

// 4️⃣ Return car early
rentalService.returnCar({
  bookingId: booking1.booking.id,
  actualReturn: new Date(now.getTime() + 30 * 60 * 1000).toISOString() // returned after 30 mins
});

// 5️⃣ Edge case: Overlapping booking (should pick next available car)
const booking3 = rentalService.createBooking({
  userId: "u3",
  branchId: branch2.id,
  carType: "SUV",
  start: now.toISOString(),
  end: twoHoursLater.toISOString()
});

// 6️⃣ Print final state
printState();
