/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let areObjectsEqual = (...args) => {
      //this function takes in a variable number of objects that's what the ...args signifies

      for(let arg of args)
      {
            if(typeof(arg) !=='object' || Array.isArray(arg) || arg === null)
            {
                  throw new Error ("Inputs must be objects")
            }
      }

      if(args.length < 2)
      {
            throw new Error ("there should be atleast 2 objects")
      }

      let objEqual = (a,b) => {
            let aKeys = Object.keys(a);
            let bKeys = Object.keys(b);

            if(aKeys.length !== bKeys.length){return false}

            for(let i=0 ; i< aKeys.length; i++)
            {
                  let key = aKeys[i];
                  if(!b.hasOwnProperty(key)){
                        return false
                  }

                  //recrusive call to self for inner objects
                  if (typeof a[key] === "object" && typeof b[key] === "object") {
                        if (!objEqual(a[key], b[key])) {
                              return false;
                        }
                  } else if(a[key] !== b[key]){
                        return false;
                  }
            }

            return true;
      }
      for (let i = 1; i < args.length; i++) {
            if (!objEqual(args[i - 1], args[i])) {
                  return false;
            }
      }
      return true;
};


export let calculateObject = (object, funcs) => {
      if(typeof object !== 'object' || object === null)
      {
            throw new Error ("Input object is not of type object")
      }
      if(funcs.length === 0)
      {
            throw new Error ("Function must have atleast one element")
      }
      if(!funcs){
            throw new Error("Function doesnt exists")
      }
      if(!Array.isArray(funcs)){
            throw new Error("Function must be of type array")
      }
      for(let f of funcs){
            if(typeof f !=='function'){
                  throw new Error("type of functions should be function")
            }
      }

      let myObj = {}

      for(let key in object){
            let value = object[key];
            if(typeof value !== 'number'){
                  throw new Error ("object values should be numbers")
            }
            let res = value;
            for(let f of funcs){
                  res = f(res)
            } 
            myObj[key] = res.toFixed(2); 
      }

      return myObj;


};

export let combineObjects = (...args) => {
      //this function takes in a variable number of objects that's what the ...args signifies
      if(args.length<2)
      {
            throw new Error ("args must have at least two objects")
      }

      for(let i of args){
            if(typeof i !== 'object')
            {
                  throw new Error("type must be object")
            }
            if(Object.keys(i).length===0){
                  throw new Error("must have at least 1 key")
            }
      }

      let myObj = {};
      for (let i=0; i< args.length-1; i++)
      {
            for(let k in args[i]){
                  for(let j = i+1; j< args.length; j++){
                        if(args[j].hasOwnProperty(k)){
                              myObj[k] = args[i][k];
                        }
                  }
            }
      }

      return myObj

};
