//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json

import axios from 'axios'

export async function Movies(){
    let {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
  return data;
}

export async function findMoviesByDirector  (directorName) {
    if(!directorName || typeof directorName !== 'string' || directorName.trim().length===0)
    {throw new Error ("invalid input")}

    let movies = await Movies()
    let x = []
    for(let i = 0; i<movies.length; i++){
        if(movies[i].director.toLowerCase() === directorName.toLowerCase()){
            x.push(movies[i]);
        }
    }
    if(x.length === 0){
        throw new Error ("No such director")
    }
    return x;
};

export async function findMoviesByCastMember  (castMemberName) {
    if(!castMemberName || typeof castMemberName !== 'string' || castMemberName.trim().length===0)
    {
        throw new Error("Invalid Input")
    }

    let movies = await Movies();

    let x = []
       for(let i = 0; i<movies.length; i++){
        if(movies[i].cast.includes(castMemberName)){
            x.push(movies[i]);
        }
    }
    if(x.length === 0){
        throw new Error ("No such movie")
    }
    return x;
};

export async function getOverallRating  (title) {
    if(!title || typeof title !== "string" || title.trim().length === 0){
        throw new Error("Invalid Input")
    }

    let movies = await Movies();
    let movie;

    for(let i = 0; i<movies.length; i++){
        if(movies[i].title.toLowerCase() === title.toLowerCase())
        {
            movie = movies[i]
        }
    }

    if(!movie){
        throw new Error("No such movie")
    }

    let reviews = movie.reviews;
    if(!reviews || reviews.length === 0){
        throw new Error("No reviews")
    }

    let ratingSum = 0;
    for(let i = 0; i<reviews.length; i++){
        ratingSum = ratingSum + reviews[i].rating
    }

    let rate = ratingSum/reviews.length;
    return Math.floor(rate*10)/10;
};

export async function getMovieById  (id) {
       if(!id || typeof id !== 'string' || id.trim().length === 0){
        throw new Error ("ID not valid")
    }

    let movies = await Movies();

    let movie 
    for (let i=0; i< movies.length; i++)
    {
        if(movies[i].id === id){
            movie = movies[i];
            break;
        }
    }

    if(!movie)
    {
        throw new Error("Movie not found")
    }

    return movie;
};

