//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json

import axios from 'axios'

export async function Users(){
    let {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json');
  return data;
}

export async function Movies(){
    let {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
  return data;
}

export async function getUserById (id) {
    if(!id || typeof id !== 'string' || id.trim().length === 0){
        throw new Error ("ID not valid")
    }

    let users = await Users();

    let user 
    for (let i=0; i< users.length; i++)
    {
        if(users[i].id === id){
            user = users[i];
            break;
        }
    }

    if(!user)
    {
        throw new Error("User not found")
    }

    return user;
};

export async function sameGenre (genre) {
    if(!genre || typeof genre !== 'string' || genre.trim().length === 0)
    {
        throw new Error ("Genre not valid")
    }

    let users = await Users();
    genre = genre.trim().toLowerCase();

    let Ugenre = []; 

    for(let i = 0; i< users.length; i++)
    {
        if(users[i].favorite_genre.toLowerCase() === genre)
        {
            Ugenre.push(users[i])
        }
    }

    if(Ugenre.length < 2)
    {
        throw new Error ("less than 2 users")
    }

    Ugenre.sort((a,b) => a.last_name.localeCompare(b.last_name))

    let f50 = Ugenre.slice(0,50)

    let names = []
    for(let i = 0; i< f50.length; i++)
    {
        let x = f50[i];
        let full = x.first_name + " " + x.last_name
        names.push(full)
    }

  return names;
}

export async function moviesReviewed (id) {

    if(!id || typeof id !== 'string' || id.trim().length === 0)
    {
        throw new Error ("Id is invalid")
    }

    let users = await Users()
    let u = [];

    for(let i = 0; i< users.length; i++)
    {
        if(users[i].id === id){
            u.push(users[i].username)
        }
    }

    if(u.length === 0){
        throw new Error("User not found")
    }

    let movU = await Movies()
    let movieReviews = [];

    for (let i = 0; i < movU.length; i++) {
        let movie = movU[i];
        for (let j = 0; j < movie.reviews.length; j++) {
            let x = movie.reviews[j];
            if (x.username === u[0]) {
                let obj = {};
                obj[movie.title] = x;
                movieReviews.push(obj);
            }
        }
    }

    return movieReviews;
};


export async function referMovies (id) {
    
    if(!id || typeof id !== 'string' || id.trim().length === 0)
    {
        throw new Error ("Id is invalid")
    }

    let users = await Users();
    let user;
    let userFG;

    for(let i = 0; i< users.length; i++){
        if(users[i].id === id)
        {
            user = users[i].username;
            userFG = users[i].favorite_genre
            break;
        }
    }

       if (!user) {
        throw new Error("User not found");
    }

    let movies = await Movies();
    let unreviewedMovies = [];

    for(let movie of movies){
        if(!movie.genre.split("|").includes(userFG)){
            continue;
        }

        let reviewed = false;
        for (let i = 0; i < movie.reviews.length; i++) {
            if (movie.reviews[i].username === user) {
                reviewed = true;
                break;
            }
        }

        if(!reviewed){
            unreviewedMovies.push(movie.title);
        }
    }
    return unreviewedMovies
};

