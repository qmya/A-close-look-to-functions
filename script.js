'use strict';

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
  console.log(bookings);
};
createBooking('LH123');
createBooking('LH123', 1);
createBooking('LH123', 1, 800);
createBooking('LH123', undefined, 800);

const flight = 'LH234';
const qandeel = {
  name: 'Qandeel Mya',
  passport: 27346348734463278,
};

const checkIn = function (flightNum, passenger) {
  //lets the flight number is changed
  flightNum = 'EL456';
  console.log(flightNum);
  console.log(passenger);
  passenger.name = 'Ms ' + passenger.name;

  if (passenger.passport === 27346348734463278) {
    console.log('CheckIn please');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, qandeel);
console.log(flight, qandeel);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};
newPassport(qandeel); //It will give a new qandeel object who passport number will be different
checkIn(flight, qandeel); // so that passport number will than go into the checkin function and will show that the passport is not equal to the original one

//Function Accepting Callback function
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  //it with convert the string(orange) like this o,r,a,n,g,e
  const [firstLetter, ...othersLetters] = str.split(' ');
  console.log(firstLetter.toUpperCase(), ...othersLetters);
  return [firstLetter.toUpperCase(), ...othersLetters].join(' ');
};
console.log(upperFirstWord);

//High order function
const transformer = function (str, fn) {
  console.log(`${fn(str)}`);
  console.log(`${str}`);
};
transformer('JavaScript is the best', upperFirstWord);
transformer('JavaScript is the best', oneWord);

const high5 = function () {
  console.log('👋🏼');
};
document.body.addEventListener('click', high5);

//For Each
//three elements in an array it will give three 👋🏼 when we click
['Jonas', 'Martha', 'Adam'].forEach(high5);
