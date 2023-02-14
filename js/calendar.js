function createBookingCalendar(year, month, bookings) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const calendar = [];

  let dayOfWeek = 0;
  for (let i = 1; i <= daysInMonth; i++) {
    if (dayOfWeek === 0) {
      calendar.push([]);
    }

    let isBooked = false;
    if (bookings) {
      isBooked = bookings.includes(`${year}-${month}-${i}`);
    }

    calendar[calendar.length - 1].push({
      day: i,
      isBooked: isBooked,
    });

    dayOfWeek = (dayOfWeek + 1) % 7;
  }

  return calendar;
}
