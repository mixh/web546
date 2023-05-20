/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {sortAndFilter} from "./arrayUtils.js"
import {merge} from "./arrayUtils.js"
import { matrixMultiply } from "./arrayUtils.js";
import { palindromes } from "./stringUtils.js";
import { censorWords } from "./stringUtils.js";
import { distance } from "./stringUtils.js";
import { areObjectsEqual } from "./objectUtils.js";
import { combineObjects } from "./objectUtils.js";
import { calculateObject } from "./objectUtils.js";

// For sortandFilter
let computers = [
    {name: 'Macbook Pro', price: "1500", city: 'San Francisco', role : 'Laptop'},
    {name: 'Dell XPS', price: "1200", city: 'New York' ,role : 'Laptop'},
    {name: 'Alienware', price: "800", city: 'London',role : 'Laptop'},
    {name: 'ROG', price: "1700", city: 'San Francisco',role : 'Laptop'},
    {name: 'Lenovo Home PC', price: "1300", city: 'New York',role : 'Desktop'},
];

try {
    let x = sortAndFilter(computers,['city','asc'], ['price', 'desc'], 'role', 'Laptop')
    console.log(x)
} catch (error) {
    console.log(error)
}

try {
    let x = sortAndFilter(computers,['city','none'], ['price', 'dec'], 'role', 'Laptop')
    console.log(x)
    
} catch (error) {
    console.log(error)
    
}

// For merge
try {
   let x =  merge(["bar", 0, 1, [[[5, "foo"]]]], [7, "buzz", ["fizz", 8]])
   console.log(x)
} catch (error) {
    console.log(error);
}

try {
   let x =  merge("bar","barista","car")
   console.log(x)
} catch (error) {
    console.log(error);
}

// for matrix multiply

try {
    let x = matrixMultiply([ [2,3], [3,4], [4,5] ], [ [1,1,1], [2,2,2] ], [ [3], [2], [1] ])
    console.log(x)
} catch (error) {
    console.log(error)
}

try {
    let x = matrixMultiply([])
    console.log(x)
} catch (error) {
    console.log(error)
}

// stringUtils.js
// for palindromes

try {
    let x = palindromes(["Madam", "Loot", "Was it a cat I saw?", "Poor Dan is in a droop", "Anna", "Nope" ]);
    console.log(x) 
} catch (error) {
    console.log(error)
}

try {
    let x = palindromes("Hello" );
    console.log(x) 
} catch (error) {
    console.log(error)
}

// for censor words
let badWords = ["bread","chocolate","pop"]
try {
    console.log(censorWords("I like bread that has chocolate chips in it but I do not like lollipops", badWords))
} catch (error) {
    console.log(error)
}

try{
    console.log(censorWords("     ", badWords))
} catch (e){
    console.log(e)
}

// for distance
try{
    let x = distance("sphinx of black quartz, judge my vow", "QUARTZ", "vOW")
    console.log(x)

} catch(e){
    console.log(e)
}

try{
    let x = distance("Hello there", "hello", "")
    console.log(x)
} catch(e){
    console.log(e)
}

// objectUtils.js

const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};

try {
    console.log(areObjectsEqual(first, second, third));
} catch (error) {
    console.log(error)
}

try {
    console.log(areObjectsEqual("foo", "bar")); 
} catch (error) {
    console.log(error)
}

//for calculateObject()

try {
    let x = calculateObject({ a: 3, b: 7, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]);
    console.log(x)
} catch (error) {
    console.log(error);
}


try {
    let x= calculateObject({ a: 'Hello', b: 7, c: false }, [(n => n * n)]);
    console.log(x)
} catch (error) {
    console.log(error);
}

// for combineObjects(...args)

try {
    let x = combineObjects(
  { b: 7, c: 5 },
  { d: 4, e: 9, a: 'waffle' },
  { a: 8, d: 2 },
  { d: 3, e: 'hello' }
  );
  console.log(x)
} catch (error) {
    console.log(error)
}

try {
    let x = combineObjects({apple : "pinea"})
    console.log(x)
} catch (error) {
    console.log(error)
}