// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {

  if (
    !name ||
    !genre ||
    !website ||
    !recordCompany ||
    !groupMembers ||
    !yearBandWasFormed
  ) {
    throw new Error("Field not provided");
  }

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof website !== "string" ||
    website.trim().length === 0 ||
    typeof recordCompany !== "string" ||
    recordCompany.trim().length === 0
  ) {
    throw new Error("Not a valid string");
  }

  if (
    !website.startsWith("http://www.") ||
    !website.endsWith(".com") ||
    website.length < 21
  ) {
    throw new Error("Not a valid website");
  }

  if (
    !Array.isArray(genre) ||
    !Array.isArray(groupMembers) ||
    genre.length === 0 ||
    groupMembers.length === 0
  ) {
    throw new Error("genre and group members should be an valid array");
  }
  if (!genre.every((x) => typeof x === "string" && x.trim().length > 0)) {
    throw new Error("genre array doesnt have valid members");
  }
  if (
    !groupMembers.every((x) => typeof x === "string" && x.trim().length > 0)
  ) {
    throw new Error("group members array doesnt have valid members");
  }
  if (
    typeof yearBandWasFormed !== "number" ||
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > 2023
  ) {
    throw new Error("yearBandFormed is not of valid type");
  }

  let band = {
    // _id : new ObjectId().toString(),
    name: name.trim(),
    genre: genre.map((x) => x.trim()),
    website: website.trim(),
    recordCompany: recordCompany.trim(),
    groupMembers: groupMembers.map((x) => x.trim()),
    yearBandWasFormed: yearBandWasFormed,
    albums : [],
    overallRating : 0
  };

  const bandCollection = await bands();
  const insertInfo = await bandCollection.insertOne(band);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error("Could not add band");
  }
  const newId = insertInfo.insertedId.toString();
  const nband = await get(newId);
  return nband;
};

export const getAll = async () => {
  const bandCollection = await bands();
  let bandList = await bandCollection.find({}).toArray();
  if (!bandList) throw "Could not get all the bands";
  bandList = bandList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return bandList;
};

export const get = async (id) => {
  // console.log(id)
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw "Invalid input id should be a string";
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw "ID is not a valid Object ID";
  }

  const bandCollection = await bands();
  const b = await bandCollection.findOne({ _id: new ObjectId(id) });
  if (b === null) throw "no such band found with the id";
  b._id = b._id.toString();
  return b;
};

export const remove = async (id) => {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";

  let bandCollection = await bands();
  const deleteInfo = await bandCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (deleteInfo.result === 0) {
    throw `cant delete this band with id ${id}`;
  }
  return `${deleteInfo.value.name} has been successfully deleted!`;
};

export const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {

  if(!id || !name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed){
    throw new Error ("Field not provided");
  }

  if(typeof id !== 'string' || typeof name !== "string" || typeof website !== 'string' || typeof recordCompany !== 'string'){
    throw new Error ("Not a valid string");
  }

  if(id.trim().length === 0 || name.trim().length === 0 || website.trim().length === 0 || recordCompany.trim().length === 0){
    throw new Error ("Not a valid string");
  }

  if(!id || typeof id !== 'string' || id.trim().length === 0){
    throw "Invalid input id should be a string"
  }

  id = id.trim();
  if(!ObjectId.isValid(id)){
    throw "ID is not a valid Object ID"
  }

  if(!website.startsWith("http://www.") || !website.endsWith(".com") || website.length < 21){
    throw new Error("Not a valid website")
  }

  if(!Array.isArray(genre) || !Array.isArray(groupMembers) || genre.length === 0 || groupMembers.length === 0)
  {
    throw new Error("genre and group members should be an valid array")
  }
  if(!genre.every((x) => typeof x === "string" && x.trim().length > 0)){
    throw new Error("genre array doesnt have valid members")
  }
  if(!groupMembers.every((x)=> typeof x === "string" && x.trim().length > 0)){
    throw new Error("group members array doesnt have valid members")
  }
  if(typeof yearBandWasFormed !== "number" || yearBandWasFormed <1900 || yearBandWasFormed > 2023){
    throw new Error ("yearBandFormed is not of valid type")
  }

  const updatedBand = {
    name: name.trim(),
    genre: genre.map((x) => x.trim()),
    website: website.trim(),
    recordCompany: recordCompany.trim(),
    groupMembers: groupMembers.map((x) => x.trim()),
    yearBandWasFormed: yearBandWasFormed
  };

   const bandCollection = await bands();

   
  const updatedInfo = await bandCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set : updatedBand},
      {returDocument: 'after'}
    );
  if(updatedInfo.result===0){
      throw 'could not update the band'
    }
  updatedInfo.value._id = updatedInfo.value._id.toString();

  const x = await get(updatedInfo.value._id);
  return x;

};
