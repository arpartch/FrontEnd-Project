/////////////////////////////////////////////ATHENA///////////////////////////////////////////////
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});
const sliders = document.querySelector(".carouselbox");
var scrollPerClick;
var ImagePadding = 20;
showMoviesData();
// Scroll Functionality
var scrollAmount = 0;
function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
  console.log("Scroll Amount: ", scrollAmount);
}
function sliderScrollRight() {
  if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });
  }
  console.log("Scroll Amount: ", scrollAmount);
}
// For showing dynamic contents only
async function showMoviesData() {
  const api_key = "4c78b28d9258298d89b3399f07b31f4e";
  var result = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      api_key +
      "&primary_release_year=2017&sort_by=revenue.desc"
  );
  result = result.data.results;
  result.map(function (cur, index) {
    sliders.insertAdjacentHTML(
      "beforeend",
      `<img class="img-${index} slider-img" src="http://image.tmdb.org/t/p/w185/${cur.poster_path}" /> `
    );
  });
  scrollPerClick = document.querySelector(".img-1").clientWidth + 20;
}
/////////////////////////////////////////ERNESTO/////////////////////////////////////////////////
///API URL LINKS
const  apiKey = 'fa3461b8cffc66e41e8c13ba8acce38c';
const movieSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=fa3461b8cffc66e41e8c13ba8acce38c&query=';
const imageURL = 'https://image.tmdb.org/t/p/w500'  //API URL endpoint to product the images/Posters 
///DOM VARIABLES
const userInput = document.getElementById('inputValue');
const searchButton = document.getElementById('search');
const moviesContainer = document.getElementById('movies-container')
const clearButton = document.getElementById('clearButton')

////////////////////////////

  



//////////

//THIS FUNCTION CREATED THE IMAGE TAG THAT HOLDS THE POSTERS
function movieSelection(movies) {  //this function is created to return the movie poster(image) from the the movies array that you will get from the data you retrieve from the api 
    return movies.map((movie) => { //here you will loop through each object using map() in the array and run the code inside for each object  * an objects inside the array is where the movie info is located, each movie is insde its own object
        if(movie.poster_path) { //this checks to make sure only to create an img tag if the movie.poster_path is true.  so if there is no image then dont create the img tag
            return `
            <img  id="myImg" src=${imageURL + movie.poster_path} data-movie-id=${movie.id} style="width:100%;max-width:300px"/>`;  // here you are creating an img tag and inserting the imageURL and adding the poster path to it, and also adding movie id from the object you are looping through *each object gets and img tag created for them
            
          }       
    })
}


//THIS FUNCTION CREATS THE DIV THAT WILL CONTIAIN THE IMAGE TAGS
function createMoviesContainers(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const movieTemplate =`
    <button type="button" id="clearButton" onclick = "moviesContainer.innerHTML = ' ' " >Clear</button>
    <section class="section">
      
        ${movieSelection(movies)}
        
      
    </section>
    <div class="content" style="display: none" >
    
            <p id="content-close">${movies}</p>
    </div>
   
    `;
    movieElement.innerHTML = movieTemplate
    return movieElement
}
  //Created a on click when search button is clicked on//  this function will populate the images
searchButton.onclick = function(event){
    event.preventDefault();
    const value = userInput.value;
    console.log(value)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fa3461b8cffc66e41e8c13ba8acce38c&query=${value}`;
    fetch(url)
    .then( (res) => res.json())
    .then((data) => {
        const movies = data.results;
        moviesContainer.innerHTML = ' ';
        const movieBlock = createMoviesContainers(movies)
        moviesContainer.appendChild(movieBlock)
    })
    .catch((error) => {
      console.log('Error:' + error)
    })
    userInput.value = ' ';
}
//////////creating modal that will populate with movie information///////////////

function clearInfoBox(){

}



document.addEventListener('click', (event)=> { //added click event 
  const target = event.target; //setting a variable equal to the events target  *the element that has the eventlistener attached to it

  if(target.tagName.toLowerCase() === 'img') { //this check all the elements that has a click event listenr and will only run code it it happened on an img tag
      console.log(event)
      
      let movieId = target.dataset.movieId; //created variable to hold the Movie Id
      console.log(target)
      console.log(target.dataset)
      console.log('MovieID:' + movieId) //log movie //

      const section = event.target.parentElement; //equal to the Section Tag, the event target is the img tag and the img tag is nest in the section container so it is considered the parentelement of the img tag
      const content = section.nextElementSibling; // equal to the content div right under the section tag. since they are both nested in the same div , on the same level they are considered siblings
     
      
      fetch(`https://api.themoviedb.org/3/movie/${movieId}videos?api_key=fa3461b8cffc66e41e8c13ba8acce38c`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        const template = `
        <button type="button" id="movieClearButton" onclick = "moviesContainer.innerHTML = ' ' " >Clear</button>
        <h4>${data.original_title}</h4>
        <p><strong>Release Date:</strong> ${data.release_date}</p>
        <p><strong>Rating:</strong> ${data.vote_average}</p> 
        <p><strong>Description:</strong> ${data.overview}</p>
        `;
        content.style.display = "block";
        content.innerHTML = template
      })
      
     
      
  }})

 

  /*
  adult: false
backdrop_path: "/kU7ZiyeUwcpTkYj3UcxSqGdZmxY.jpg"
belongs_to_collection: null
budget: 0
genres: (2) [{…}, {…}]
homepage: ""
id: 618353
imdb_id: "tt12794046"
original_language: "en"
original_title: "Batman: Death in the Family"
overview: "Tragedy strikes the Batman's life again when Robin Jason Todd tracks down his birth mother only to run afoul of the Joker. An adaptation of the 1988 comic book storyline of the same name."
popularity: 219.428
poster_path: "/k8Q9ulyRE8fkvZMkAM9LPYMKctb.jpg"
production_companies: (2) [{…}, {…}]
production_countries: [{…}]
release_date: "2020-10-13"
revenue: 0
runtime: 96
spoken_languages: [{…}]
status: "Released"
tagline: "The fate of Gotham is in your hands."
title: "Batman: Death in the Family"
video: false
vote_average: 7.4
vote_count: 168
__proto__: Object
*/