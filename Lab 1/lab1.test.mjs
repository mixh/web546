import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input


//question 1
console.log(lab1.questionOne([5,3,10]));
console.log(lab1.questionOne([2, 1, 2]));
console.log(lab1.questionOne([512, 1007, 17389]));
console.log(lab1.questionOne([0, 14159, 785]));
console.log(lab1.questionOne([11, 4])); 

//question 2
console.log(lab1.questionTwo([1, 2, 3, 4, 5, 6, 7]));  // Returns and then outputs [true] 
console.log(lab1.questionTwo([10, 7, 6, 11])); //Returns and then outputs [false, 0, 1]
console.log(lab1.questionTwo([28,45,1002, 10000])); //Returns and then outputs [true]
console.log(lab1.questionTwo([99,100,105,103,101]));    //Returns and then outputs [false, 2,3]
console.log(lab1.questionTwo([1, 2, 1, 0, 5, 6, 3]));

//question 3
console.log(lab1.questionThree({a:1,b:2,c:3}, {c:10, a:20, b:30}));  // Returns and then outputs {a:true, b:true, c:true}
console.log(lab1.questionThree({a:1,b:2,c:3, d:4}, {f:10, b:20, e:30, d: 40, c:50, a:60})); // Returns and then outputs {a:true, b:true, c:true, d:true, e:false, f:false} 
console.log(lab1.questionThree({a:1, b:2, c:3}, {c:10, a:20, b:30, d: 40})); 
console.log(lab1.questionThree({}, {f:10, b:20, e:30}));
console.log(lab1.questionThree({foo:"I'm foo", bar: "I'm bar", fizz: "I'm fizz" , buzz: "I'm buzz" }, {fizz: "I'm not buzz", foo:"I'm not bar", buzz: "I'm not fizz", bar: "I'm not foo", c:50, a:60})); // Returns and then outputs {foo:true, bar: true, fizz: true, buzz: true, c:false, a:false}
console.log(lab1.questionThree({a:10, b:20, c:30, d: 40, e:50, f:60}, {a:1,b:2,c:3} )); //Returns and then outputs {a: true, b: true, c:true, d: false, e: false, f: false}

// question 4
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`));

console.log(lab1.questionFour(`Roger,Smith,A101
Novak,Johnson,B101
Serena,Williams,C101`));

console.log(lab1.questionFour(`Steve,WillDoIT,Z101
Olajide,Olatunji,Y101
Patrick,Mahomes,X101`));

console.log(lab1.questionFour(`Tom,Rock,M101
Dwayne,Some,N101
Chappelle,thing,O101`));

console.log(lab1.questionFour(`The,Smiths,F101
Carneigie,Fellar,G101
Cosmo,Big,K101`));