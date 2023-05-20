import * as bands from "./data/bands.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
// await closeConnection();

try{
const ledZeppelin = await bands.create("Led Zeppelin", ["Hard Rock", "Blues Rock", "Heavy Metal"], "http://www.ledzeppelin.com", "Atlantic Records", ["Jimmy Page", "Robert Plant", "John Paul Jones", "John Bonham"], 1968);
console.log(ledZeppelin)
}catch(e){
    console.log(e)
}

try{
const metallica = await bands.create("Metallica", ["Thrash Metal", "Heavy Metal"], "http://www.metallica.com", "Blackened Recordings", ["James Hetfield", "Kirk Hammett", "Robert Trujillo", "Lars Ulrich"], 1981);
}
catch(e){
    console.log(e)
}

try{
      const allBands = await bands.getAll();
    console.log(allBands);
} catch(e){console.log(e)}

try {
    const queen = await bands.create("Queen", ["Rock", "Glam Rock", "Hard Rock"], "http://www.queenonline.com", "EMI, Parlophone", ["Freddie Mercury", "Brian May", "Roger Taylor", "John Deacon"], 1970);
    console.log(queen)
} catch (error) {
    console.log(error)
}

try{
      const renamedLedZe = await bands.rename("63fa87ab4da26c11a49e8f19", "Good Tshirts"); 
 console.log(renamedLedZe); 
} catch(e){
    console.log(e)
}

try{
    const removeMettalica = await bands.remove("63fa87ab4da26c11a49e8f1a"); 
//  console.log(removeMettalica); 
}catch(e){
    console.log(e)
}

try{
      const allBands = await bands.getAll();
    console.log(allBands);
} catch(e){console.log(e)}


// Try to create a band with bad input parameters to make sure it throws errors.

try{
    const alphonso = await bands.create("Test Zeppelin", ["Hard Rock", "Blues Rock", "Heavy Metal"], "http://www.abcd.com", "Atlantic Records", ["Jimmy Page", "Robert Plant", "John Paul Jones", "John Bonham"], "moth");
}catch(e){
    console.log(e)
}

// Try to remove a band that does not exist to make sure it throws errors.
try{
    const removeBad = await bands.remove("63fa87ab4da26c1341t534153412"); 
}catch(e){
    console.log(e)
}
// Try to rename a band that does not exist to make sure it throws errors.
try{
    const renameBad = await bands.rename("63fa87ab4da26c1341t534153412","YSL Y EDP"); 
}catch(e){
    console.log(e)
}
// Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
try{
    const renameBad = await bands.rename("63fa87ab4da26c11a49e8f19","     "); 
}catch(e){
    console.log(e)
}

// Try getting a band by ID that does not exist to make sure it throws errors.
try{
    const getBad = await bands.get("63fa87ab4da26c1341t534153412"); 
}catch(e){
    console.log(e)
}

await closeConnection();