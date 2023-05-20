//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const exportedMethods= {

    checkFirstName(firstName){
    if (!firstName) {
      throw "first name not provided";
    }
    
    //https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
    var hasNumber = /\d/;
    
    firstName = firstName.trim();
    if (
      typeof firstName !== "string" ||
      firstName.length < 2 ||
      firstName.length > 25 ||
      hasNumber.test(firstName)
    ) {
      throw "first name is not valid string";
    } 

    return firstName;
  },


    checkLastName(lastName){
    var hasNumber = /\d/;
        if (!lastName) {
          throw "last name not provided";
        }
        
        lastName = lastName.trim();
        if (
          typeof lastName !== "string" ||
          lastName.length < 2 ||
          lastName.length > 25 ||
          hasNumber.test(lastName)
        ) {
          throw "last name is not valid string";
        }

        return lastName;
    },

    checkEmailAddress(emailAddress){
        if (!emailAddress) {
          throw "email not provided";
        }
        
        //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
        var emailRE = /\S+@\S+\.\S+/;
        emailAddress = emailAddress.toLowerCase().trim();
        if (typeof emailAddress !== "string" || !emailRE.test(emailAddress)) {
          throw "email address is not valid";
        }

        return emailAddress;
    },

    checkPassword(password){
        var hasNumber = /\d/;
          if (!password) {
            throw "password not provided";
          }
        
          var upperCaseRE = /[A-Z]/;
          var specialRE = /[!@#$%^&*]/;
          password = password.trim();
          if (
            typeof password !== "string" ||
            password.length < 8 ||
            !hasNumber.test(password) ||
            !upperCaseRE.test(password) ||
            !specialRE.test(password)
          ) {
            throw "password not valid";
          }

          return password;
    },

    checkRole(role){
          if (!role) {
            throw "role not provided";
          }
        
          role = role.trim().toLowerCase();
        
          if (typeof role !== "string" || (role !== "admin" && role !== "user")) {
            throw "invalid role";
          }

          return role;
    }
}


export default exportedMethods;