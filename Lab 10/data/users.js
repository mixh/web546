//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import helper from "../helpers.js";

const saltRounds = 1;

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  if(!firstName){
    throw 'first name not provided';
  }

  //https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
  var hasNumber = /\d/;

  firstName = firstName.trim();
  if(typeof firstName !== 'string' || firstName.length <2 || firstName.length >25 || hasNumber.test(firstName)){
    throw 'first name is not valid string';
  }

  if(!lastName){
    throw 'last name not provided';
  }

  lastName = lastName.trim();
  if(typeof lastName!== 'string' || lastName.length <2 || lastName.length > 25 || hasNumber.test(lastName)){
    throw 'last name is not valid string';
  }

  if(!emailAddress){
    throw 'email not provided';
  }

  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  var emailRE = /\S+@\S+\.\S+/;
  emailAddress = emailAddress.toLowerCase().trim();
  if(typeof emailAddress !== 'string' || !emailRE.test(emailAddress) ){
    throw 'email address is not valid'
  }


  if(!password){
    throw 'password not provided';
  }

  var upperCaseRE = /[A-Z]/;
  var specialRE = /[!@#$%^&*]/;
  password = password.trim();
  if(typeof password !== 'string' || password.length < 8 || !hasNumber.test(password) || !upperCaseRE.test(password) || !specialRE.test(password)){
    throw 'password not valid';
  }

  if(!role)
  {
    throw 'role not provided'
  }

  role = role.trim().toLowerCase();

  if (typeof role !== 'string' || (role !=='admin' && role !== 'user')){
    throw 'invalid role';
  }

  const encryptedPassword = await bcrypt.hash(password,saltRounds);

  let user = {
    firstName : firstName,
    lastName : lastName, 
    emailAddress : emailAddress,
    password : encryptedPassword,
    role : role
  }

  const userCollection = await users();
  const existingUser = await userCollection.findOne({emailAddress : emailAddress});
  if(existingUser){
    throw 'user with same email already exists';
  }

  const insertInfo = await userCollection.insertOne(user);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }

  return {insertedUser : true};
};

export const checkUser = async (emailAddress, password) => {


    if (!emailAddress) {
      throw "email not provided";
    }
    emailAddress = emailAddress.toLowerCase().trim();
    //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    var emailRE = /\S+@\S+\.\S+/;
    if (typeof emailAddress !== "string" || !emailRE.test(emailAddress)) {
      throw "email address is not valid";
    }

    
  if(!password){
    throw 'password not provided';
  }

  var hasNumber = /\d/;
  var upperCaseRE = /[A-Z]/;
  var specialRE = /[!@#$%^&*]/;
  password = password.trim();
  if(typeof password !== 'string' || password.length < 8 || !hasNumber.test(password) || !upperCaseRE.test(password) || !specialRE.test(password)){
    throw 'password not valid';
  }


   const userCollection = await users();
   const inDb = await userCollection.findOne({ emailAddress: emailAddress });

   if (!inDb) {
     throw "Either the email address or password is invalid";
   }else {
    const dbPassword = inDb.password;
    let comparePassword = await bcrypt.compare(password, dbPassword);
    if(!comparePassword){
      throw 'Passwords do not match';
    } else{
      return {
        firstName : inDb.firstName,
        lastName : inDb.lastName,
        emailAddress : inDb.emailAddress,
        role : inDb.role
      }
    }

   }


};