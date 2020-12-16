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

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //Get the answer
    let answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);
    //Register the answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
  },

  // displayResults(type = 'array') {
  //   if (type === 'array') {
  //     console.log(this.answers);
  //   } else if (type === 'string') {
  //     // Poll results are 13, 2, 4, 1
  //     console.log(`Poll results are ${this.answers.join(', ')}`);
  //   }
  // },
};
poll.registerNewAnswer();
console.log(poll.answers);
//calling the above method whenever the user clicks the "Answer poll" button
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//Bonus
//[5,2,3]
// poll.displayResults.call({ answer: [5, 2, 3] }, 'string');

//Immediately invoking function expressions
//A function that is executed once
//We use in other function called async/await
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
runOnce();
//It can run as much time as we want ☝🏽
//this will executed once 👇🏽
(function () {
  console.log('This will never run again');
})();
//for arrow function
(() => console.log('This will ALSO never run again'))();

//Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();

//Closure example
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f();
console.dir(f);
const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
console.dir(f);
g();
f();
h();
f();

//Example 2
const boardPassengers = function (noOfPassengers, waitTime) {
  const perGroup = noOfPassengers / 3;
  //Lets use a time to know the wait time
  //This setTimeOut will be executed after a certain number of time that we have written
  //here it is executed after 1000 milliseconds
  setTimeout(function () {
    console.log(`We are now boarding ${noOfPassengers} passengers`);
    console.log(`There are 3 groups, and each group have ${perGroup}`);
  }, waitTime * 1000); //SetTimeOut have two perimeter one is funtion other is time
  console.log(`Will starts boarding in ${waitTime} seconds`);
};
boardPassengers(180, 3);

//SEt time out usage
//Looks like a call back
setTimeout(function () {
  console.log('When the timer is finish you can see this console comment');
}, 1000);
