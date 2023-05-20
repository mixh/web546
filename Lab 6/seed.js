import * as bands from "./data/bands.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
//

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    const ledZeppelin = await bands.create(
      "Led Zeppelin",
      ["Hard Rock", "Blues Rock", "Heavy Metal"],
      "http://www.ledzeppelin.com",
      "Atlantic Records",
      ["Jimmy Page", "Robert Plant", "John Paul Jones", "John Bonham"],
      1968
    );
    console.log(ledZeppelin);
  } catch (e) {
    console.log(e);
  }

  try {
    const metallica = await bands.create(
      "Metallica",
      ["Thrash Metal", "Heavy Metal"],
      "http://www.metallica.com",
      "Blackened Recordings",
      ["James Hetfield", "Kirk Hammett", "Robert Trujillo", "Lars Ulrich"],
      1981
    );
  } catch (e) {
    console.log(e);
  }

  try {
    const queen = await bands.create(
      "Queen",
      ["Rock", "Glam Rock", "Hard Rock"],
      "http://www.queenonline.com",
      "EMI, Parlophone",
      ["Freddie Mercury", "Brian May", "Roger Taylor", "John Deacon"],
      1970
    );
    console.log(queen);
  } catch (error) {
    console.log(error);
  }

  console.log("seeded on the database");

  await closeConnection();
}

main();
