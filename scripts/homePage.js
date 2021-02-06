$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});


///API URL LINKS
const  apiKey = 'fa3461b8cffc66e41e8c13ba8acce38c';
const movieSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=fa3461b8cffc66e41e8c13ba8acce38c&query=';
const imageURL = 'https://image.tmdb.org/t/p/w500'  //API URL endpoint to product the images/Posters 

///DOM VARIABLES
const userInput = document.getElementById('inputValue');
const searchButton = document.getElementById('search');
const moviesContainer = document.getElementById('movies-container')

//THIS FUNCTION CREATED THE IMAGE TAG THAT HOLDS THE POSTERS
function movieSelection(movies) {  //this function is created to return the movie poster(image) from the the movies array that you will get from the data you retrieve from the api 

    return movies.map((movie) => { //here you will loop through each object using map() in the array and run the code inside for each object  * an objects inside the array is where the movie info is located, each movie is insde its own object
        
        if(movie.poster_path) { //this checks to make sure only to create an img tag if the movie.poster_path is true.  so if there is no image then dont create the img tag
            return `<img src=${imageURL + movie.poster_path} data-movie-id=${movie.id}/>`;  // here you are creating an img tag and inserting the imageURL and adding the poster path to it, and also adding movie id from the object you are looping through *each object gets and img tag created for them
        }       
    })
}

//THIS FUNCTION CREATS THE DIV THAT WILL CONTIAIN THE IMAGE TAGS
function createMoviesContainers(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const movieTemplate =`
    <section class="section">
        ${movieSelection(movies)}
    </section>
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

        const movieBlock = createMoviesContainers(movies)

        moviesContainer.appendChild(movieBlock)
        
    })
    userInput.value = ' ';
}




