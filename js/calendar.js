// function createBookingCalendar(year, month, bookings) {
//   const daysInMonth = new Date(year, month, 0).getDate();
//   const firstDay = new Date(year, month - 1, 1).getDay();
//   const calendar = [];

//   let dayOfWeek = 0;
//   for (let i = 1; i <= daysInMonth; i++) {
//     if (dayOfWeek === 0) {
//       calendar.push([]);
//     }

//     let isBooked = false;
//     if (bookings) {
//       isBooked = bookings.includes(`${year}-${month}-${i}`);
//     }

//     calendar[calendar.length - 1].push({
//       day: i,
//       isBooked: isBooked,
//     });

//     dayOfWeek = (dayOfWeek + 1) % 7;
//   }

//   return calendar;
// }

function Event(name, age, number, address, startDate, endDate) {
  this.name = name;
  this.age = age;
  this.number = number;
  this.address = address;
  this.startDate = startDate;
  this.endDate = endDate;
  Event.allEvents.push(this);
}

Event.allEvents = [];

let totalBookings = 0;

if (localStorage.getItem("eventData") !== null) {
  const eventData = JSON.parse(localStorage.getItem("eventData"));

  for (let i = 0; i < eventData.length; i++) {
    new Event(
      eventData[i].name,
      eventData[i].age,
      eventData[i].number,
      eventData[i].address,
      eventData[i].startDate,
      eventData[i].endDate
    );
  }
}

const form = document.getElementById("new-booking-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const parentNameInput = event.target.name.value;
  const childAge = event.target.childAge.value;
  const childNameInput = event.target.childName.value;
  const addressInput = event.target.address.value;
  const childNumberInput = event.target.childNumber.value;
  const startDate = event.target.startDay.value;
  const endDate = event.target.endDay.value;

  console.log(parentNameInput);
  console.log(childNameInput);
  console.log(childNumberInput);
  console.log(childAge);
  console.log(addressInput);
  console.log(startDate);
  console.log(endDate);

  form.reset();

  const newBooking = new Event(
    parentNameInput,
    childNameInput,
    childNumberInput,
    childAge,
    addressInput,
    startDate,
    endDate
  );

  // To save the customer interractions in the localstorage
  const eventsStr = JSON.stringify(Event.allEvents);
  localStorage.setItem("eventData", eventsStr);
});

// function Calendar(year, month, days, bookings) {
//   this.year = year;
//   this.month = month;
//   this.days = days;
//   this.bookings = bookings;
//   Calendar.BookingCalendar.push(this);
// }

// Calendar.BookingCalendar = [];

// const daysTag = document.querySelector(".days"),
//   currentDate = document.querySelector(".current-date"),
//   prevNextIcon = document.querySelectorAll(".icons span");

// // getting new date, current year and month
// let date = new Date(),
//   currYear = date.getFullYear(),
//   currMonth = date.getMonth();

// // storing full name of all months in array
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// function renderCalendar() {
//   let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
//     lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
//     lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
//     lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
//   let liTag = "";
// }

// new Calendar("2023", "02", "15", "Sport Center");
