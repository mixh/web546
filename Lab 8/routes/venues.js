//Import express and express router as shown in lecture code and worked in previous labs
import {Router} from 'express';
const router = Router();
import axios from 'axios';

//You can make your axios calls to the API directly in the routes
router.route('/').get(async (req, res) => {
  //code here for GET

  try {
    res.render('homepage', {title : "Venue Finder"})
  } catch (error) {
    res.status(500).json({error : error});    
  }
});

router.route('/searchvenues').post(async (req, res) => {
  //code here for POST

  try {
    req.body.searchVenueTerm = req.body.searchVenueTerm.trim();
    if(!req.body.searchVenueTerm) throw "no input entered";
    if(req.body.searchVenueTerm.length===0) throw "not a valid string";

    const API_KEY = "7oPrZoisShNsByJcA1jR893dxxURRbNL";
    const searchVenueTerm = req.body.searchVenueTerm;
    const url =
        `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${API_KEY}&countryCode=US`;
    
    const response = await axios.get(url);
    const venues = response.data._embedded?.venues?.slice(0,10) || [];

    // venues.forEach(venue => {
    //   console.log(`${venue.name}`);
    //   console.log(`${venue.id}`);
    // });

    try {
      if(venues.length === 0){
        throw new Error ("No such venues found");
      }
    } catch (error) {
      return res.status(400).render('venueNotFound',{title: "Venues Not Found",value: searchVenueTerm, error : error});
    }
    
    res.render('venueSearchResults', {title:'Venues Found', venues: venues, value: searchVenueTerm});

  } catch (error) {
    return res.status(400).render('error', {title: "No Input Entered",error : error});
  }
});

router.route('/venuedetails/:id').get(async (req, res) => {
  //code here for GET

  try{

    const API_KEY = "7oPrZoisShNsByJcA1jR893dxxURRbNL";
    const VENUE_ID_HERE = req.params.id; 
    const endPoint = `https://app.ticketmaster.com/discovery/v2/venues/${VENUE_ID_HERE}?&apikey=${API_KEY}&countryCode=US`

    const response = await axios.get(endPoint);

    let name = "N/A";
    if(!response.data.name){
      name = "N/A";
    } else{
      name = response.data.name;
    }
    
    let imageLink = '/public/images/No_Image_Available.jpg'
    if(!response.data.images || !response.data.images[0].url){
     imageLink = "/public/images/No_Image_Available.jpg";
    } else{
    imageLink = response.data.images[0].url;}

    let website = "N/A";
    if(!response.data.url){
      website = "N/A";
    } else{
      website = response.data.url
    }

    let addressLine = "N/A";
    if(!response.data.address.line1 || !response.data.address){
      addressLine = "N/A";
    }else{
      addressLine = response.data.address.line1;
    }

    let city = "N/A";
    if(!response.data.city.name|| !response.data.city)
    {
      city = "N/A";
    } else{
      city = response.data.city.name;
    }

    let state = "N/A";
    if(!response.data.state || !response.data.state.stateCode){
      state = "N/A"
    }else{
      state = response.data.state.stateCode;
    }

    let postal = "N/A";
    if(!response.data.postalCode){
      postal = "N/A";
    } else{
      postal = response.data.postalCode;
    }

    // const postal = response.data.postalCode ? response.data.postalCode : "N/A";
    let phone = "N/A";
    if(!response.data.boxOfficeInfo || !response.data.boxOfficeInfo.phoneNumberDetail){
     phone = 'N/A'
    }
    else {
     phone = response.data.boxOfficeInfo.phoneNumberDetail;
    }


    res.render('venueByID', {title : "Venue Details", header: "Venue Details", name: name, imageLink: imageLink,
  website: website, addressLine: addressLine, city: city, state: state, postal : postal, phone : phone});
  } catch(error){
    res.status(500).json({error : error});
    console.error(error)
  }

});

export default router;