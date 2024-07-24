'use strict'
console.log('app start');
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

const movieCardsNowPlayingEl = document.querySelector('.now-playing')
const heroImgEl = document.querySelector('.hero-img')
const categoriesEl = document.querySelector('.categories')


const moviesNowPlaying = []
const moviesPopular = []
const moviesTopRated = []
const moviesUpcoming = []
const genres = []
const categories = [
  { title: 'Movies', imageUrl: 'Movies.png' },
  { title: 'Theatre', imageUrl: 'theatre.png' },
  { title: 'Cartoons', imageUrl: 'cartoons.jpg' },
  { title: 'Premieres', imageUrl: 'premieres.jpg' },
  { title: 'Comedies', imageUrl: 'comedies.png' },
]

function showCategories() {
  categories.forEach(cat => {
    console.log(cat.title);
    const markup = `
      <div class="category">
        <img src="./images/${cat.imageUrl}" alt="${cat.title}">
        <p class="category-label">${cat.title}</p>
      </div>
    `
    categoriesEl.insertAdjacentHTML('beforeend', markup)
  })
}
showCategories()


async function fetchGenres() {
  const response = await fetch(`${API_URL}/genre/movie/list`, options)
  const data = await response.json()
  data.genres.forEach(g => genres.push(g))
}
fetchGenres()


async function fetchMovies(listName, movies) {
  const response = await fetch(`${API_URL}/movie/${listName}`, options)
  const data = await response.json()
  data.results.slice(0, 6).forEach(m => {
    const movieGenre = genres.find(g => g.id === m.genre_ids[0])
    m.genreName = movieGenre?.name
    m.posterUrl = `${IMAGE_BASE_URL}/w500${m.poster_path}`
    m.backdropUrl = `${IMAGE_BASE_URL}/w1280${m.backdrop_path}`

    movies.push(m)
  });
  showMovies(listName, movies)
}

fetch(`${API_URL}/movie/1093995?api_key=653346`, options)
.then(res=>res.json())
.then(data=>console.log(data))


fetchMovies('now_playing', moviesNowPlaying)
fetchMovies('popular', moviesPopular)
fetchMovies('top_rated', moviesTopRated)
fetchMovies('upcoming', moviesUpcoming)


function updateHeroImg() {
  let num = 0
  setInterval(() => {
    heroImgEl.style.backgroundImage = `url('${moviesNowPlaying[num].backdropUrl}}')`
    num++
    if (num === 6) num = 0
  }, 3 * 1000) 
}
updateHeroImg()

function showMovies(listName, movies) {
  listName = listName.split('_').join('-')
  const containerEl = document.querySelector(`.${listName}`)
  movies.forEach(m => generateMarkup(m, containerEl))
}

function showMovieYear(date) {
  const newDate = new Date(date)
  return newDate.getFullYear()
}


function generateMarkup(movie, containerEl) {
  const markup = `
  <a class="movie-card" href="movie.html?movie-id=/${movie.id}">
      <img src="${movie.posterUrl}" alt="">
      <div class="movie-details">
        <h3>${movie.title}</h3>
        <p class="info">${showMovieYear(movie.release_date)}, ${movie.genreName}</p>
        <p class="purchase">Purchase</p>
    </div>
  </a>
  `
  containerEl.insertAdjacentHTML('beforeend', markup)
}