// Show the booking details saved by the home page.

const booking = JSON.parse(sessionStorage.getItem("myCarRentalBooking") || "null");
const summaryMessage = document.querySelector("#summary-message");
const summaryDetails = document.querySelector("#summary-details");

if (booking) {
  summaryMessage.textContent = "Your estimated booking is ready. This demo does not send a real reservation.";
  summaryDetails.hidden = false;
  summaryDetails.textContent =
    "Pick-up location: " + booking.location + "\n" +
    "Vehicle: " + booking.car + "\n" +
    "Pick-up date: " + booking.pickup + "\n" +
    "Return date: " + booking.dropoff + "\n" +
    "Rental days: " + booking.rentalDays + "\n" +
    "Estimated total: $" + booking.totalPrice;
}
