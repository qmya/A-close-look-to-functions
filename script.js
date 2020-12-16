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

//Functions returning other functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeter = greet('Hey');
greeter('Qandeel');
greeter('Purdal ❤️');
//We can also do like this
greet('Hello')('Ami ❤️');

//The above greet function make an arrow function

const newGreet = newGreeting => {
  // return console.log(`${newGreeting}`);
  return newName => {
    console.log(`${newGreeting}, ${newName}`);
  };
};
const newGreeter = newGreet('Salam');
newGreeter('Qandeel');

//You can also write the above arrow function like this too, KEEP IT DRY
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hello')('Qandeel');

//The call and apply Methods
const airCanada = {
  airline: 'Air Canada',
  airlineCode: 'AC',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.airlineCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.airlineCode}${flightNum}`,
      name,
    });
  },
};
airCanada.book(123456789, 'Qandeel');
airCanada.book(1234567810, 'Purdal');
console.log(airCanada.bookings);
//Lets after few years Air Canada created a new air line
const flairAirLine = {
  airline: 'Flair',
  airlineCode: 'FL',
  bookings: [],
};

const book = airCanada.book;
//but now if we wanna call the same functionin Flair object
// book(23, 'ggdsj'); //This cannot work because of this

//so we use

book.call(flairAirLine, 2345, 'Qandeel');
console.log(flairAirLine);
book.call(airCanada, 4567, 'Purdal');
