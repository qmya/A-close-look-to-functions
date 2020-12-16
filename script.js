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

//so we use .call when the function is inside some other but you wanna use it for the other object the same way

//CALL METHOD:
//manually set the this keyword for any function
book.call(flairAirLine, 2345, 'Qandeel');
console.log(flairAirLine);
book.call(airCanada, 4567, 'Purdal');

const swiss = {
  airline: 'Swiss Airlines',
  airlineCode: 'SW',
  bookings: [],
};

book.call(swiss, 2864, 'Purdal');
book.call(swiss, 5678, 'Qandeel');
console.log(swiss);

//APPLY METHOD:
//You dont need to pass an argument directly
//You have to make an array and then pass it through

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//This apply method is no more use
//We no more use apply method we use call in modren javascript
book.call(swiss, ...flightData);
console.log(swiss);

//Bind method:
const bookAC = book.bind(airCanada); //bind always gives us a function
bookAC(23, 'Steven William'); //Same like passing a perimeter to a function
console.log(airCanada.bookings);

const bookFL = book.bind(flairAirLine);
bookFL(45, 'Kate fooster');
console.log(flairAirLine.bookings);

const bookSW = book.bind(swiss);
bookSW(56, 'Anne');
console.log(swiss.bookings);

//You call also do this
//preset the flight number
//set some argument
const bookSW23 = book.bind(swiss, 23);
bookSW23('Ian');
bookSW23('Frankie');
console.log(swiss.bookings);

//Add event listeners

airCanada.planes = 300; //initally its 300
airCanada.buyPlane = function () {
  console.log('button is working');
  //this always points to the element that the event handler is attached too
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
airCanada.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', airCanada.buyPlane.bind(airCanada)); //Aircanada is increasing when you click on button

//partial application
//preset perimeters

//general function of adding tax
const addTax = (rate, value) => value + value * rate;
addTax(10, 200);
console.log(addTax(0.1, 200));

//tax in canada
//first argument of bind is "This" keyword
//here we dont care because we dont have a this, so we will write "null"
const taxInCanada = addTax.bind(null, 0.35);
taxInCanada(8000);
console.log(taxInCanada(8000));

//Challenge

// const newAddTax = rate => value => value + value * rate; Also write like this 👇🏽
const newAddTax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const newTaxInCanada = newAddTax(0.35);
console.log(newTaxInCanada(5000));
newAddTax(0.35)(8000);
console.log(newAddTax(0.35)(8000));
