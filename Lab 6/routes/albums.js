// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
const router = Router();
import { ObjectId } from "mongodb";
import { albumData } from "../data/index.js";
import { bandsData } from "../data/index.js";

router
  .route('/:bandId')
  .get(async (req, res) => {

    try {
      if(!req.params.bandId){
        throw new Error ("no Id")
      }
      if(typeof req.params.bandId !== 'string' || req.params.bandId.trim().length === 0) throw new Error ("id should be a valid string");
      if(!ObjectId.isValid(req.params.bandId.trim())){
        throw new Error ("No Such Band ID provided")
      }
    } catch (e) {
      return res.send(400).json({error : e});
    }

    try {
      let doesExist = await albumData.getAll(req.params.bandId);
    } catch (e) {
      return res.status(404).json({error : e.message})
    }

    try {
      const albumList = await albumData.getAll(req.params.bandId);
      if(albumList.length === 0){
        throw new Error ("no such albums found")
      }
      res.status(200).json(albumList)
    } catch (e) {
      return res.status(400).json({error : e});
    }


    //code here for GET
  })
  .post(async (req, res) => {
    let userInfo = req.body;

    try {

      if(!req.params.bandId){
        throw ("no id provided")
      }

      if(!userInfo.title || !userInfo.releaseDate || !userInfo.tracks){
        throw ("Fields not provided");
      }
      req.params.bandId = req.params.bandId.trim();
      userInfo.title = userInfo.title.trim();
      userInfo.releaseDate = userInfo.releaseDate.trim();

      if(req.params.bandId.length === 0 || userInfo.title.length === 0 || userInfo.releaseDate.length === 0){
        throw ("not a valid string");
      }
      if(typeof req.params.bandId !== 'string' || typeof userInfo.title !== 'string' || typeof userInfo.releaseDate !== 'string'){
        throw ("Not a string");
      }

      if(!ObjectId.isValid(req.params.bandId)){
        throw ("invalid band id");
      }

      if(!Array.isArray(userInfo.tracks) || userInfo.tracks.length<3 || !userInfo.tracks.every(e => typeof e === 'string' && e.trim().length > 0)){
        throw ("invalid array")
      }

      if(isNaN(Date.parse(userInfo.releaseDate))){
    throw ("release date should be valid string");
  }

      const releaseYear = new Date(userInfo.releaseDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if(releaseYear < 1900 || releaseYear > currentYear + 1){
        throw ('releaseDate must be between 1900 and next year ')
      }

      if(typeof userInfo.rating !== 'number' || userInfo.rating < 1 || userInfo.rating > 5){
        throw ("Invalid rating")
      }
      if (!Number.isInteger(userInfo.rating * 10)) {
          throw ("Ratings should only have one decimal place");
      }
    } catch (e) {
      // console.log(e)
      return res.status(400).json({error : e});
    }

    try {
      const doesExist = await bandsData.get(req.params.bandId)
    } catch (e) {
      console.log(e);
      return res.status(404).json({error : e});
    }

    try {
      const newAlbum = await albumData.create(req.params.bandId, userInfo.title, userInfo.releaseDate, userInfo.tracks, userInfo.rating)
      
      res.status(200).json(newAlbum);
    } catch (error) {
      console.log(error);
      res.status(404).json({error : error.message});
    }
    //code here for POST
  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {

    try {
      if(!req.params.albumId){
        throw new Error ("no Id")
      }
      if(typeof req.params.albumId !== 'string' || req.params.albumId.trim().length === 0) throw new Error ("id should be a valid string");
      if(!ObjectId.isValid(req.params.albumId.trim())){
        throw new Error ("No Such Band ID provided")
      }
    } catch (e) {
      return res.status(400).json({error : e})
    }

    try {
      const album = await albumData.get(req.params.albumId);
      res.status(200).json(album);
    } catch (e) {
      res.status(404).json({error: e})
    }

    //code here for GET
  })
  .delete(async (req, res) => {

    try {
      if(!req.params.albumId){
        throw new Error ("no Id")
      }
      if(typeof req.params.albumId !== 'string' || req.params.albumId.trim().length === 0) throw new Error ("id should be a valid string");
      if(!ObjectId.isValid(req.params.albumId.trim())){
        throw new Error ("No Such Band ID provided")
      }
    } catch (e) {
      return res.status(400).json({error : e.message});
    }

    try {
      await albumData.get(req.params.albumId)
    } catch (e) {
      return res.status(404).json({error : e})
    }

    try {
      await albumData.remove(req.params.albumId);
      res.status(200).json({albumId : req.params.albumId, deleted: true})
    } catch (e) {
      res.status(400).json({error : "albums.remove file issue"});
    }
    //code here for DELETE
  });

export default router;