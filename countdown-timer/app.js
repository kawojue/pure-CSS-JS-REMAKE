const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sept", "Oct", "Nov", "Dec",
];
const weekdays = [
  "Sund", "Mon", "Tue",
  "Wed", "Thu", "Fri", "Sat",
];

//2019, 11, 21, 17, 42, 0
const theDate = new Date(2019, 11, 21, 17, 42, 0);
console.log(theDate);
const days = ((theDate.getTime() - new Date().getTime())/(1000 * 60 * 60 * 24));
console.log(Math.abs(Math.round(days)));

// selectors..
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.countdown h4');

// initializing..
let futureDate = new Date(2022, 6, 5, 21, 30, 0, 0);

// get data..
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${format(hours)}:${format(mins)}`;

function format(item) {
  if (item < 10) {
    return item = `0${item}`;
  }
  return item;
};

// values in ms
const futureTime = futureDate.getTime();

// calculate the remaining day(s)
function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = oneDay / 24;
  const oneMinute = oneHour / 60;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (t  < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired"> sorry, this giveaway has expired.</h4>`
  }
}

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
