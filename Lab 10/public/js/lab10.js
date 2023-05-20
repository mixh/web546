// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!


const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  const emailInput = document.getElementById("emailAddressInput");
  const passwordInput = document.getElementById("passwordInput");

  if (!emailInput.value) {
    event.preventDefault(); // Prevent form submission
    alert("Please enter a valid email address.");
    return;
  }

  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  var emailRE = /\S+@\S+\.\S+/;
  var email = emailInput.value.toLowerCase().trim();
  if (typeof email !== "string" || !emailRE.test(email)) {
    event.preventDefault(); // Prevent form submission
    alert("Please enter a valid email address.");
    return;
  }

  // Check if the password field is empty
  if (!passwordInput.value) {
    event.preventDefault(); // Prevent form submission
    alert("Please enter a password.");
    return;
  }

  var hasNumber = /\d/;
  var upperCaseRE = /[A-Z]/;
  var specialRE = /[!@#$%^&*]/;
  var password = passwordInput.value.trim();
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    !hasNumber.test(password) ||
    !upperCaseRE.test(password) ||
    !specialRE.test(password)
  ) {
    event.preventDefault(); // Prevent form submission
    alert(
      "Please enter a valid password. Your password must be at least 8 characters long, contain a number, an uppercase letter, and a special character."
    );
    return;
  }
});


// Get the registration form element
const registrationForm = document.getElementById('registration-form');

// Add a submit event listener to the registration form
registrationForm.addEventListener('submit', function(event) {
  // Get the form input fields
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const emailInput = document.getElementById("emailAddressInput");
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const roleInput = document.getElementById("roleInput");

  // Check if any of the fields are empty
  if (
    !firstNameInput.value ||
    !lastNameInput.value ||
    !emailInput.value ||
    !passwordInput.value ||
    !confirmPasswordInput.value ||
    !roleInput.value
  ) {
    event.preventDefault(); // Prevent form submission
    alert("Please fill out all required fields.");
    return;
  }

  if (!roleInput.value) {
    event.preventDefault(); // Prevent form submission
    alert("Please select a role."); // Custom alert message for role field
    return;
  }

  if (roleInput.value !== "admin" && roleInput.value !== "user") {
    event.preventDefault();
    alert("Role needs to be either admin or user"); // Custom alert message for invalid role
    return;
  }

  if (!emailInput.value) {
    event.preventDefault(); // Prevent form submission
    alert("Please enter a valid email address.");
    return;
  }

  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  var emailRE = /\S+@\S+\.\S+/;
  var email = emailInput.value.toLowerCase().trim();
  if (typeof email !== "string" || !emailRE.test(email)) {
    event.preventDefault(); // Prevent form submission
    alert("Please enter a valid email address.");
    return;
  }

  // Check if the password field is empty
  if (!passwordInput.value) {
    event.preventDefault(); // Prevent form submission
    alert("Please enter a password.");
    return;
  }

  var hasNumber = /\d/;
  var upperCaseRE = /[A-Z]/;
  var specialRE = /[!@#$%^&*]/;
  var password = passwordInput.value.trim();
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    !hasNumber.test(password) ||
    !upperCaseRE.test(password) ||
    !specialRE.test(password)
  ) {
    event.preventDefault(); // Prevent form submission
    alert(
      "Please enter a valid password. Your password must be at least 8 characters long, contain a number, an uppercase letter, and a special character."
    );
    return;
  }
});
