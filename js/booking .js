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
