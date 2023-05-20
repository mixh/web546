// This data file should export all functions using the ES6 standard as shown in the lecture code

import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { get as bandsGet}  from "./bands.js";


export const create = async (
  bandId,
  title,
  releaseDate,
  tracks,
  rating
) => {
  if (!bandId || !title || !releaseDate || !tracks || !rating) {
    throw "All Fields must be provided";
  }
  if (
    typeof bandId !== "string" ||
    typeof title !== "string" ||
    typeof releaseDate !== "string"
  ) {
    throw "Wrong type should be strings";
  }
  if (
    bandId.trim().length === 0 ||
    title.trim().length === 0 ||
    releaseDate.trim().length === 0
  ) {
    throw "empty strings";
  }
  bandId = bandId.trim();
  if (!ObjectId.isValid(bandId)) throw "invalid object ID";

  if (!Array.isArray(tracks)) {
    throw "should be array";
  }

  for (let i = 0; i < tracks.length; i++) {
    tracks[i] = tracks[i].trim();
  }

  if (
    tracks.length < 3 ||
    !tracks.every((x) => typeof x === "string" && x.trim().length > 0)
  ) {
    throw "should be atleast 3 elements";
  }

  if (isNaN(Date.parse(releaseDate))) {
    throw "release date should be valid string";
  }

  const releaseYear = new Date(releaseDate).getFullYear();
  const currentYear = new Date().getFullYear();
  if (releaseYear < 1900 || releaseYear > currentYear + 1) {
    throw "releaseDate must be between 1900 and next year ";
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    throw "Invalid rating must be between 1 and 5";
  }
  if (!Number.isInteger(rating * 10)) {
    throw "Ratings should only have one decimal place";
  }

  let newAlbum = {
    _id: new ObjectId(),
    title: title.trim(),
    releaseDate: releaseDate.trim(),
    tracks: tracks,
    rating: rating,
  };

  const bandCollection = await bands();

  const albumToBeAdded = await bandCollection.updateOne(
    { _id: new ObjectId(bandId) },
    { $addToSet: { albums: newAlbum } }
  );
  if (albumToBeAdded.result === 0) throw "Error: cant add the album to band";

  const x  = await bandCollection.findOne({_id : new ObjectId(bandId)});
  let newOverallRating = rating;

  if(x.albums.length>0){
    let RatingsSum = 0;
    for(let i= 0; i<x.albums.length; i++){
      RatingsSum = RatingsSum + x.albums[i].rating
    }
    newOverallRating = (RatingsSum / x.albums.length).toFixed(1)
  }

  const ratingsUpdate = await bandCollection.updateOne(
    { _id: new ObjectId(bandId) },
    [{ $set: { overallRating:  newOverallRating } }]
  );
  if (ratingsUpdate.result === 0) throw "cant update the ratings";

  const band = await bandCollection.findOne({ _id: new ObjectId(bandId) });
  if (!band) {
    throw "band not found";
  }
  return band;
};

export const getAll = async (bandId) => {

  bandId = bandId.trim();
  if(!bandId){
    throw new Error("band id not given");
  }

  if(typeof bandId != 'string' || bandId.trim().length === 0){
    throw new Error ("should be a string");
  }

  if(!ObjectId.isValid(bandId)){
    throw new Error('Invalid band object id')
  }

  const x = await bandsGet(bandId);
  const ai = x.albums;

  return ai;

};

export const get = async (albumId) => {

  albumId = albumId.trim();
  if(!albumId){
    throw new Error ("id not provided");
  }
  if(typeof albumId !== 'string'|| albumId.trim().length === 0){
    throw new Error ("not a valid string");
  }
  if(!ObjectId.isValid(albumId)){
    throw new Error ("invalid object id");
  }

  const bandCollection = await bands();
  const band = await bandCollection.findOne({'albums._id' : new ObjectId(albumId)});
  if(band === null) {throw new Error("Invalid Band")}
  const album = band.albums.find(x => x._id.toString() === albumId);
  album._id = album._id.toString();
  return album;
   
};

export const remove = async (albumId) => {

  if(!albumId){throw new Error ('Id not provided')}
  if(typeof albumId !== 'string' || albumId.trim().length === 0){
    throw new Error("invalid string");
  }
  albumId = albumId.trim();
  if(!ObjectId.isValid(albumId)){
    throw new Error ('not a valid id');
  }

  try{
  const bandCollection = await bands();
  const band = await bandCollection.findOne({'albums._id': new ObjectId(albumId) });
  if(!band) {throw new Error("no such Band found")}

  const albumToBeRemoved = await bandCollection.updateOne({'albums._id': new ObjectId(albumId)}, {$pull: {albums:{_id: new ObjectId(albumId)}}});
  if(albumToBeRemoved.result === 0) throw 'cant delete the album';

    const x = await bandCollection.findOne({ _id: new ObjectId(band._id.toString()) });
    let newOverallRating = 0;

    if (x.albums.length > 0) {
      let RatingsSum = 0;
      for (let i = 0; i < x.albums.length; i++) {
        RatingsSum = RatingsSum + x.albums[i].rating;
      }
      newOverallRating = (RatingsSum / x.albums.length).toFixed(1);
    }

    const ratingsUpdate = await bandCollection.updateOne(
      { _id: new ObjectId(band._id.toString()) },
      [{ $set: { overallRating: newOverallRating } }]
    );

  if(ratingsUpdate.result === 0) throw 'cant update the rating';
  }
  catch(e){
    console.log(e);
    return;
  }
  return {albumId : albumId, deleted:true};


};


///go to main - go to pullrequest - click compare and pull 