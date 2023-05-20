export const questionOne = (arr) => {
  // Implement question 1 here
  let sum=0;
  for(let i = 0; i< arr.length; i++)
  {
    let cube = arr[i]*arr[i]*arr[i]
    sum = sum + cube;
  }
  let isPrime = true; 

  for(let i=2; i<sum;  i++ )
  {
    if(sum%i === 0) 
    {isPrime = false;
    break;}
  }

  let myobj = {[sum] : isPrime};

  return myobj //return result
};

export const questionTwo = (numArray) => {
  // Implement question 2 here

  let first = -1;
  let sorted = true;

  for(let i = 0; i< numArray.length; i++)
  {
    if(numArray[i]>numArray[i+1])
    {
      first = i;
      sorted = false;
      break;
    }
  }

  var myNumArray
  if (sorted === false)
  {
    myNumArray = [sorted, first, first+1]
  }
  else {
    myNumArray = [sorted]
  }


  return myNumArray; //return result
};

export const questionThree = (obj1, obj2) => {
  // Implement question 3 here
  let key1 = Object.keys(obj1);
  let key2 = Object.keys(obj2);
  let myobj = {};

  for(let i=0; i< key1.length;i++)
  {
    myobj[key1[i]] = key2.includes(key1[i]);
  }

  for(let i=0; i< key2.length; i++)
  {
    if(!key1.includes(key2[i])){
      myobj[key2[i]] = false;
    }
  }

  return myobj;
};

export const questionFour = (string) => {
  // Implement question 4 here
  let lines = string.split("\n");
  let arr = [];

  for(let i =0; i<lines.length; i++)
  {
    arr.push(lines[i].split(","));
  }

  return arr; //return result
};

export const studentInfo = {
  firstName: 'MIHIR',
  lastName: 'JAIN',
  studentId: '20015434'
};
