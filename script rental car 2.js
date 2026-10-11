// My Car Rental 2 - website interactions

const bookingButton = document.querySelector(".book-btn");
const bookingMessage = document.querySelector(".booking-message");
const carSelect = document.querySelector(".car-select");
const pickupDate = document.querySelector(".pickup-date");
const returnDate = document.querySelector(".return-date");
const locationInput = document.querySelector(".location-input");
const pageTitle = document.querySelector(".hero-title");

// Set the earliest available rental date to today.
const today = new Date();
const todayValue = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

pickupDate.min = todayValue;
returnDate.min = todayValue;

// The return date cannot be earlier than the pick-up date.
pickupDate.addEventListener("change", function () {
  returnDate.min = pickupDate.value || todayValue;

  if (returnDate.value && returnDate.value <= pickupDate.value) {
    returnDate.value = "";
  }
});

returnDate.addEventListener("change", function () {
  if (pickupDate.value && returnDate.value <= pickupDate.value) {
    showBookingMessage("Return date must be after the pick-up date.", false);
    returnDate.value = "";
  }
});

function showBookingMessage(message, isSuccess) {
  bookingMessage.textContent = message;
  bookingMessage.style.display = "block";
  bookingMessage.style.color = isSuccess ? "#166534" : "#991b1b";
  bookingMessage.style.backgroundColor = isSuccess ? "#f0fdf4" : "#fef2f2";
  bookingMessage.style.borderColor = isSuccess ? "#bbf7d0" : "#fecaca";
}

bookingButton.addEventListener("click", function () {
  const location = locationInput.value.trim();
  const car = carSelect.value;
  const pickup = pickupDate.value;
  const dropoff = returnDate.value;

  if (!car) {
    showBookingMessage("Please select a vehicle.", false);
    carSelect.focus();
    return;
  }

  if (!pickup) {
    showBookingMessage("Please choose your pick-up date.", false);
    pickupDate.focus();
    return;
  }

  if (!dropoff) {
    showBookingMessage("Please choose your return date.", false);
    returnDate.focus();
    return;
  }

  if (dropoff <= pickup) {
    showBookingMessage("Return date must be after the pick-up date.", false);
    returnDate.focus();
    return;
  }

  if (!location) {
    showBookingMessage("Please enter your pick-up location.", false);
    locationInput.focus();
    return;
  }

  const dailyRates = {
    BMW: 80,
    "MERCEDES BENZ": 100,
    KIA: 50,
    PORSCHE: 120
  };

  const start = new Date(pickup + "T00:00:00");
  const end = new Date(dropoff + "T00:00:00");
  const rentalDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
  const totalPrice = dailyRates[car] * rentalDays;

  const booking = {
    location: location,
    car: car,
    pickup: pickup,
    dropoff: dropoff,
    rentalDays: rentalDays,
    totalPrice: totalPrice
  };

  sessionStorage.setItem("myCarRentalBooking", JSON.stringify(booking));
  window.location.href = "booking-summary.html";
});

// Keep the vehicle names and daily rates consistent.
carSelect.querySelectorAll("option").forEach(function (option) {
  if (option.value === "POURCH") {
    option.value = "PORSCHE";
    option.textContent = "PORSCHE";
  }
});


