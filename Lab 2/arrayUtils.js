/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  
  if(!array) {
    throw new Error ("Array is missing")}
  
    if(!Array.isArray(array)){
  throw new Error ("Not an array")}
  
  if(array.length===0){
  throw new Error ("Empty Array")}

  for(let element of array)
  {
    if(typeof element != 'object')
    {
      throw new Error ("Type Not object")
    }

    // to check if each object is not empty
    if(Object.keys(element).length === 0)
    {
      throw new Error ("Empty object")
    }

    //all keys are strings and not empty
    for(let key in element)
    {
      if(typeof element[key] != 'string' || !element[key].trim().length){
        throw new Error ("all values for for all keys in each object in the array parameter are strings (not just empty spaces)")
      }
    }
  }

  let firstKeys = Object.keys(array[0]);
  for(let i = 1; i< array.length; i++)
  {
    let otherKeys = Object.keys(array[i]);
    if(otherKeys.length!== firstKeys.length)
    {throw new Error ("All objects in the array parameter must have the same keys")} 

    for(let i=0; i<firstKeys.length;i++){
      let thisKey = firstKeys[i];
      if(!otherKeys.includes(thisKey)){
        throw new Error ("All objects in the array parameter must have the same keys")
      }
    }
  }

  if(array.length <2)
  {
    throw new Error ("Need at least two objects")
  }

  //-------------------

  if(!sortBy1)
  {
    throw new Error ("SortBy1 is missing")
  }
  if(sortBy1.length===0)
  {
    throw new Error("Second Parameter [SortBy,order] is empty")
  }

  if(!Array.isArray(sortBy1)){
    throw new Error ("Second Parameter doesnt exists")
  }
  if(sortBy1.length !== 2)
  {
    throw new Error ("the 2nd array parameter can have two and only two elements")
  }

  for(let element of sortBy1){
    if (typeof element !== 'string' || !element.trim().length){
      throw new Error ("Error : Each element in the 2nd parameter must be a string")
    }
  }

  for (let element of array){
    if(!element.hasOwnProperty(sortBy1[0])){
      throw new Error("Error : the 2nd array parameter [sortByField1, order] index 0 is a key that exists as a key in the array of objects and each object in the array of objects passed in as the first input parameter has that key.")
    }
  }

  if(sortBy1[1] !== 'asc' && sortBy1[1] !== 'desc')
  {
    throw new Error ("can only be asc or desc")
  }
  //------------------------

  if(!sortBy2)
  {
    throw new Error ("SortBy2 is missing")
  }

  if(sortBy2.length === 0){
    throw new Error ("3rd parameter is empty")
  }

  if(sortBy2.length !== 2)
  {
    throw new Error ("two and only two elements are allowed")
  }

  for(let element in sortBy2)
  {
    if(typeof(element)!== 'string' || !element.trim().length)
    {
      throw new Error ("can only be strings not just empty spaces")
    }
  }

  for(let element of array){
    if(!element.hasOwnProperty(sortBy2[0])){
      throw new Error ("index 0 is a key that exists as a key in the array of objects")
    }
  }

  if(sortBy2[1] !== 'asc' && sortBy2[1] !== 'desc')
  {
    throw new Error ("can only be asc or desc")
  }

  //-----------
  for (let element of array){
    if(!element.hasOwnProperty(filterBy)){
      throw new Error("the filterBy key doesnt exist in the object array")
    }
  }

  if(!filterByTerm || !filterByTerm.trim().length || !typeof(filterByTerm) === 'string')
  {
    throw new Error("filter by term must exist")
  }

  //-------------

  array.sort((a,b)=>{
    if(sortBy1[1] ==='asc'){
      return a[sortBy1[0]] > b[sortBy1[0]] ? 1 : -1
    } else {
      return a[sortBy1[0]] < b[sortBy1[0]] ? 1 : -1
    }
    })

    array.sort((a,b)=>{
    if(sortBy2[1] ==='asc'){
      return a[sortBy2[0]] > b[sortBy2[0]] ? 1 : -1
    } else {
      return a[sortBy2[0]] < b[sortBy2[0]] ? 1 : -1
    }
    })


      array = array.filter(function(element) {
        return element[filterBy] === filterByTerm;
      });

      return array
  
};

export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  if(args.length === 0)
  {
    throw new Error (" At least one array is reqd")
  }

  let ans = []

  for(let input of args) {
    input = input.flat(Infinity);
    if(!Array.isArray(input)){
      throw new Error ("Input is not array")
    }
    if(input.length === 0){
      throw new Error ("Each array must have one element")
    }

    for(let element of input){
      if(Array.isArray(element)){
        ans = ans.concat(merge(...element))
      } else if (typeof(element)!== 'string' && typeof(element) !== 'number'){
        throw new Error ("each element must be string or a number or an array")
      }
      else {
        ans.push(element)
      }
    }
  }

  ans.sort((a,b) => {
    if(typeof a === 'number' && typeof b === 'number'){
      return a-b;
    } else if (typeof a === 'string' && typeof b === 'string'){
      return a.localeCompare(b);
    } else if (typeof a === 'number'){
      return -1
    } else {
      return 1;
    }
  });

  return ans

};

export let matrixMultiply = (...args) => {
    //this function takes in a variable number of arrays that's what the ...args signifies

    if(args.length<2){
      throw new Error("There should be atleast two inputs")
    }


    for (let matrix of args) {
    if (!Array.isArray(matrix)) {
      throw new Error("Each input must be an array");
    }
  }

    for (let matrix of args) {
    if (matrix.length === 0) {
      throw new Error("Each input array must not be empty");
    }
  }

  for (let matrix of args) {
    for (let row of matrix) {
      if (!Array.isArray(row)) {
        throw new Error("The outer array must have only arrays as elements");
      }
    }
  }

  for (let matrix of args) {
    for (let row of matrix) {
      for (let element of row) {
        if (typeof element !== 'number') {
          throw new Error("The inner arrays must only have numbers as elements");
        }
      }
    }
  }

  let ans = args[0];
  for (let i = 1; i < args.length; i++) {
    let next = args[i];
    let rowCount = ans.length;
    let columnCount = ans[0].length;
    let nextRowCount = next.length;
    let nextColumnCount = next[0].length;

    if (columnCount !== nextRowCount) {
      throw new Error("The args cannot be multiplied column count != row count");
    }
    
    let result = [];
    for (let row = 0; row < rowCount; row++) {
      let res = [];
      for (let nextCol = 0; nextCol < nextColumnCount; nextCol++) {
        let sum = 0;
        for (let col = 0; col < columnCount; col++) {
          sum += ans[row][col] * next[col][nextCol];
        }
        res.push(sum);
      }
      result.push(res);
    }
    ans = result;
};

  return ans;

}
