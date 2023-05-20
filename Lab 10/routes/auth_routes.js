//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router();
import axios from "axios";
import { userData } from "../data/index.js";
import validation from "../helpers.js";


router.route('/').get(
  async (req,res,next) =>{
    if (req.session.user) {
      if (req.session.user.role === "admin") {
        return res.redirect("/admin");
      } else if (req.session.user.role === "user") {
        return res.redirect("/protected");
      }
    }
    return res.redirect("/login");
  }, 
  async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
        try {
          res.render("register", { title: "Sign-Up" });
        } catch (error) {
          res.render("error", { error: error });
          console.log(error);
        }
  })
  .post(async (req, res) => {
    //code here for POST

    try {
      const firstNameInput = validation.checkFirstName(req.body.firstNameInput);
      const lastNameInput = validation.checkLastName(req.body.lastNameInput);
      const emailAddressInput = validation.checkEmailAddress(req.body.emailAddressInput);
      const passwordInput = validation.checkPassword(req.body.passwordInput);
      const roleInput = validation.checkRole(req.body.roleInput);

      if(req.body.confirmPasswordInput !== passwordInput){
        throw new Error ('passwords dont match')
      }

      // console.log(req.body.firstNameInput);

      try{
              console.log(firstNameInput);
      const newUser = await userData.createUser(firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput);
      res.redirect("/login");
      } catch(e){
        console.log(error);
        res.status(500).render('login',{title : "Login", error : error})
      }
      }
      catch (error) {
        console.log(error);
      res.status(400).render('error', {title : 'Sign-Up', error : error});
    }

  });

router
  .route('/login')
  .get(
    async (req, res) => {

        try {
          res.render("login", { title: "login" });
        } catch (error) {
          res.render("error", { error: error });
          console.log(error);
        }
  })
  .post(async (req, res) => {
    //code here for POST

    try {
      var email = validation.checkEmailAddress(req.body.emailAddressInput);
      var password = validation.checkPassword(req.body.passwordInput);

      const x = await userData.checkUser(email,password);
      if(x){
        
        req.session.user = {
          firstName : x.firstName,
          lastName : x.lastName,
          emailAddress : x.emailAddress,
          role : x.role
        }
        if(x.role === 'admin'){
          res.redirect('/admin')
        } else{
          res.redirect('/protected')
        }
      }

    } catch (error) {
      console.log(error);
      res.status(400).render('login' , {error : error})
    }

  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  try {
    if(req.session.user){
      if(req.session.user.role === 'admin'){
        res.render('protected', {title : "protected", firstName : req.session.user.firstName, currentTime : new Date().toUTCString(), role : req.session.user.role, exists: req.session.user.role})
      }
      else if(req.session.user.role === 'user'){
        res.render("protected", {
          title: "protected",
          firstName: req.session.user.firstName,
          currentTime: new Date().toUTCString(),
          role: req.session.user.role
        });
      }
    }
  } catch (error) {
    res.render("error", {error : error})
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  try {    
    if(req.session.user){
      res.render('admin',{title : "admin", firstName : req.session.user.firstName, currentTime : new Date().toUTCString()})
    }
  } catch (error) {
    res.render("error", { error: error });
  }
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  res.status(500).render("error", {title : "Error"})
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  try {
    if(req.session.user){
      req.session.destroy();
      res.clearCookie("AuthCookie");
      res.render("logout",{title : "Logged Out"})
    } else{
      res.redirect("/")
    }
  } catch (error) {
    res.render("error", { error: error });
  }
});


export default router;