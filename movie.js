'use strict'
const API_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTdmMDdlZTg1MjMwOWNkMzg1NzZjYjc1OTg5ZDUwYSIsInN1YiI6IjYyZDE1MjUzNTQ5ZGRhMDJkNWQzMWI1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-4q-LIkEZVZ0Al98nl5h5dvSdREGZoE4UR2rZCRm0qI'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  };
  
console.log(window.location.search)
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const movieId = urlParams.get('movie-id')

let movie = null

async function fetchMovie(){
  const res = await fetch(`${API_URL}/movie/${movieId}`, options)
  const data = await res.json()
  movie = data
  console.log(movie);
}

fetchMovie()



function genMarkup(movie){
    const markup = `
      <h1 id="text">${movie.title} </h1>
    `
 }
getMovie()


document.querySelector("text")