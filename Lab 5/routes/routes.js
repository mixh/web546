//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method
'/aboutme';
'/mystory';
'/educationhistory'
export the router */

import {Router} from 'express';
const router = Router();

router
  .route('/aboutme')
  .get(async (req, res) => {
    try {
       const data = {
    firstName: 'Mihir',
    lastName: 'Jain',
    biography: 'I cant think about anything it is 4 am in the morning i probably missed an apostrophe in cant i did it again \n This is the new paragraph seprated by a new line i need to write a biography paragaraph over here, i just watched Aladdin on broadway honestly mid hopefully that newline character works',
    favoriteMovies: ['Inception','Goodfelas', 'Casino', 'FullMetal', 'Godfather'],
    hobbies: ['Finance', 'Music','Travelling'],
    fondestMemory: 'Tokyo vacation with mom and dad'
  };
      res.json(data);
    } catch (e) {
      res.status(500).send(e);
    }
  })

router
  .route('/mystory')
  .get(async(req,res) => {
    try{
    const data = {
  "storyTitle": "Night Crawler",
  "storyGenre": "Horror",
  "story": "It is about a night crawler.\n Simply an old frail dog with a habit of killing his owner in the night.\n yeah sweet looking killer dog."
};
    res.json(data);} 
    catch(e){
        res.status(500).send(e);
    }
  })

router
  .route('/educationhistory')
  .get(async(req,res) => {
    try{
    const data = [
    {
      "schoolName": "St Anslems",
      "degreeEarned": "H.S. Diploma",
      "numberOfYearsAttended": 4,
      "favoriteClasses": ["Mathematics", "Physics", "Economics"],
      "favoriteSchoolMemory": "Graduating"
    },
    {
      "schoolName": "Manipal University",
      "degreeEarned": "Bachelors",
      "numberOfYearsAttended": 4,
      "favoriteClasses": ["History", "Java", "Physics", "Thermodynamics"],
      "favoriteSchoolMemory": "Attending classes stupid drunk with friends"
    },
    {
      "schoolName": "Stevens Institute",
      "degreeEarned": "Masters",
      "numberOfYearsAttended": 1,
      "favoriteClasses": ["Algorithms", "Operating Systems", "Web Dev", "Java"],
      "favoriteSchoolMemory": "The Pier"
    }
]
    res.json(data);} 
    catch(e){
        res.status(500).send(e);
    }
  })





export default router;