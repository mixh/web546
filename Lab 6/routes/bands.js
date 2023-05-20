// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
const router = Router();
import { ObjectId } from "mongodb";
import {bandsData} from "../data/index.js"

router
  .route('/')
  .get(async (req, res) => {
    try {

      const bandData = await bandsData.getAll();
      let bandList = [];

      bandData.forEach(e => {
        bandList.push({
          _id : e._id.toString(),
          name : e.name
        })
      });

      res.json(bandList);
    } catch (e) {
      res.status(404).json(e);

    }
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST

    let userInfo = req.body;
    try{
      if(!userInfo.name || !userInfo.genre || !userInfo.website || !userInfo.recordCompany || !userInfo.groupMembers || !userInfo.yearBandWasFormed){
        throw "not provided valid Inputs"
      }
      if(typeof userInfo.name !== 'string' || typeof userInfo.website !== 'string' || typeof userInfo.recordCompany !=='string'){
        throw "invalid inputs should be strings"
      }
      userInfo.name = userInfo.name.trim();
      userInfo.website = userInfo.website.trim();
      userInfo.recordCompany = userInfo.recordCompany.trim();

      if(userInfo.name.length === 0 || userInfo.website.length === 0 || userInfo.recordCompany.length === 0){
        throw 'empty strings';
      }

      if (!userInfo.website.startsWith("http://www.") ||!userInfo.website.endsWith(".com") ||userInfo.website.length < 21) {
          throw new Error("Not a valid website");
      }

        if (
          !Array.isArray(userInfo.genre) ||
          !Array.isArray(userInfo.groupMembers)
        ) {
          throw new Error("genre and group members should be an valid array");
        }

        for(const[i,e] of userInfo.genre.entries()){
          userInfo.genre[i] = userInfo.genre[i].trim();
        }

        for(const[i,e] of userInfo.groupMembers.entries()){
          userInfo.groupMembers[i] = userInfo.groupMembers[i].trim();
        }

      if( userInfo.genre.length ===0 || userInfo.genre.find(element => typeof element !== 'string' || element.trim().length==0)){
        throw 'invalid genre array elements'
      }

      if(userInfo.groupMembers.find(element => typeof element !== 'string' || element.trim().length === 0)){
        throw 'invalid group members array elements'
      }

      if(typeof userInfo.yearBandWasFormed !== 'number' || userInfo.yearBandWasFormed < 1900 || userInfo.yearBandWasFormed > 2023){
        throw 'invalid yearBandWasFormed'
      }
    }
    catch(e){
      return res.status(400).json({error : e});
    }

    try {
      const newBand = await bandsData.create(userInfo.name, userInfo.genre, userInfo.website, userInfo.recordCompany, userInfo.groupMembers, userInfo.yearBandWasFormed);
      res.status(200).json(newBand)
    } catch (e) {
      res.status(404).json({error : e})
    }

  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {

      if(!req.params.id){
        throw 'no id is provided'
      }

      req.params.id = req.params.id.trim();
      if(typeof req.params.id !== 'string' || req.params.length === 0){
        throw 'id is not a valid string'
      }
      if(!ObjectId.isValid(req.params.id)){
        throw 'invalid object id'
      }
      
    } catch (e) {
      return res.status(400).json({error : e})
    }

    try {
      const band = await bandsData.get(req.params.id);
      res.status(200).json(band);
    } catch (e) {
      res.status(404).json({error : 'band not found'})
    }
    //code here for GET
  })
  .delete(async (req, res) => {

    try {
      if(!req.params.id){
        throw 'no id is provided'
      }

      req.params.id = req.params.id.trim();
      if(typeof req.params.id !== 'string' || req.params.length === 0){
        throw 'id is not a valid string'
      }
      if(!ObjectId.isValid(req.params.id)){
        throw 'invalid object id'
      }
    } catch (e) {
      return res.status(400).json({error : e});
    }

    try {
      await bandsData.get(req.params.id)
    } catch (e) {
      return res.send(404).json({error : 'no such band found'});
    }

    try {
      await bandsData.remove(req.params.id);
      res.status(200).json({bandId : req.params.id, deleted: true});
    } catch (e) {
      res.status(500).json({error : e})
    }
    //code here for DELETE
  })
  .put(async (req, res) => {
    let userInfo = req.body;

    try {
          if (!req.params.id) {
            throw("no id is provided");
          }

          req.params.id = req.params.id.trim();
          if (typeof req.params.id !== "string" || req.params.length === 0) {
            throw ("id is not a valid string");
          }
          if (!ObjectId.isValid(req.params.id)) {
            throw ("invalid object id");
          }
        } 
    catch (e) {
          return res.status(400).json({ error: e });
        }
    
    try {
      await bandsData.get(req.params.id);
    } catch (e) {
      return res.status(404).json({error: e})
    }

    try {
      if(!userInfo.name || !userInfo.genre || !userInfo.website || !userInfo.recordCompany || !userInfo.groupMembers || !userInfo.yearBandWasFormed){
        throw ("Invalid Inputs")
      }
      if(typeof userInfo.name !== 'string' || typeof userInfo.website !== 'string' || typeof userInfo.recordCompany !=='string'){
        throw ("invalid inputs should be strings")
      }
      userInfo.name = userInfo.name.trim();
      userInfo.website = userInfo.website.trim();
      userInfo.recordCompany = userInfo.recordCompany.trim();

      if(userInfo.name.length === 0 || userInfo.website.length === 0 || userInfo.recordCompany.length === 0){
        throw ('empty strings');
      }

      if (!userInfo.website.startsWith("http://www.") ||!userInfo.website.endsWith(".com") ||userInfo.website.length < 21) {
          throw("Not a valid website");
      }

        if (
          !Array.isArray(userInfo.genre) ||
          !Array.isArray(userInfo.groupMembers)
        ) {
          throw ("genre and group members should be an valid array");
        }

        for(const[i,e] of userInfo.genre.entries()){
          userInfo.genre[i] = userInfo.genre[i].trim();
        }

        for(const[i,e] of userInfo.groupMembers.entries()){
          userInfo.groupMembers[i] = userInfo.groupMembers[i].trim();
        }

      if( userInfo.genre.length ===0 || userInfo.genre.find(element => typeof element !== 'string' || element.trim().length==0)){
        throw  ('invalid genre array elements');
      }

      if(userInfo.groupMembers.find(element => typeof element !== 'string' || element.trim().length === 0)){
        throw  ('invalid group members array elements');
      }

      if(typeof userInfo.yearBandWasFormed !== 'number' || userInfo.yearBandWasFormed < 1900 || userInfo.yearBandWasFormed > 2023){
        throw ('invalid yearBandWasFormed');
      }
    }
    catch(e){
      return res.status(400).json({error : e});
    }

    try {

      const updatedBand = await bandsData.update(req.params.id, userInfo.name, userInfo.genre, userInfo.website, userInfo.recordCompany, userInfo.groupMembers, userInfo.yearBandWasFormed);
      res.status(200).json(updatedBand);
    } catch (e) {
      res.status(400).json({error: e});
    }
    

    //code here for PUT
  });



export default router;