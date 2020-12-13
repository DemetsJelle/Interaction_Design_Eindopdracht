"use strict";
let html_overview;
let html_details;
let html_overlay;
let teller = 0;
let detailsTeller = 0;
let lstGenres ="";

//Animation toevoegen aan de overlay

const ShowMovies = function(jsonObject){

    let htmlstring_movies = "";
    
    for(const item of jsonObject.results){
        htmlstring_movies =`<div class="panel">
                                <div class="o-layout o-layout--justify-space-between">
                                    <div class="c-picture">
                                        <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" alt="Image Movie"/>
                                    </div>
                                <div class="c-text">
                                    <p class="c-main-info-panel__text">${item.title}</p>
                                    <p class="c-main-info-panel__text">${item.release_date}</p>
                                    <p class="js-detailbtn" data-counter=${teller} data-IsVisible=0><i class="c-arrow down" ></i></p>
                                </div>
                                <div class="c-details js-details${detailsTeller}">

                                </div>
                            </div>`;
        html_overview.innerHTML += htmlstring_movies;
        // console.log(`Teller ${teller}`);
        teller += 1; 
        detailsTeller += 1;
    };

    listenToClickDetails(jsonObject.results);
}
    


const listenToClickDetails = function(jsonObject)
{
    const buttons = document.querySelectorAll(".js-detailbtn");
    for (const b of buttons)
    {
        b.addEventListener("click",function(){
            console.log("button geklikt");
            ShowDetailsMovie(jsonObject[b.getAttribute("data-counter")], b.getAttribute("data-counter"));
        });
    };
    overlayResponsive();
}

const ShowDetailsMovie = function(jsonObject, counter)
{
    //html_overview = document.querySelector(`.js-details${counter}`);
    console.log("button pressed");
    let genre = "";
    for(const item of lstGenres.genres)
    {

        for(const genre_id of jsonObject.genre_ids)
            if(genre_id == item.id)
            {
                genre += `${item.name} `;
                console.log(genre);
            }
    }

    html_overlay.classList.remove("c-visible");
    html_overview.classList.add("c-opacity");
    html_overview.classList.add("js-overlay_close");
    html_overlay.classList.add("c-animation-up");

    let htmlstring_details = `
    <section class="o-row__overlay">
    <div class="o-container">
        <div class="o-layout o-layout--align-center o-layout--justify-center">
            <div class ="c-tab js-animation">
                <div class="c-upper">
                    <div class="c-image">
                        <img class ="c-overlay-image" src="https://image.tmdb.org/t/p/w500${jsonObject.poster_path}" alt="Image Movie"/>
                    </div>
    
                    <div class="c-main-info">
                        
                        <div class="c-main-info__textarea">
                            
                            <p class="c-main-info__text-js">${jsonObject.title}</p>
                        </div>

                        <div class="c-main-info__textarea">

                            <p class="c-main-info__text-js">${jsonObject.release_date}</p>
                        </div>
    
                    </div>

                    <div class="c-cross">
                        <a href="#" class="c-close js-button-close"></a>
                    </div>
                    
                </div>

                <div class="c-lower">
                    <div class="c-info-details">

                        <div class="c-info-details__textarea">
                            <p class="c-info-details__text">Genres:</p> 
                            <p class="c-info-details__text-js">${genre}</p>
                        </div>

                        <div class="c-info-details__textarea">
                            <p class="c-info-details__text">Rating:</p>
                            <p class="c-info-details__text-js">${jsonObject.vote_average}</p>
                        </div>

                        <div class="c-info-details__textarea">
                            <p class="c-info-details__text">Description:</p>
                            <p class="c-info-details__text-js c-display--block">${jsonObject.overview}</p>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>`;

    console.log(html_overview)
    html_overlay.innerHTML = htmlstring_details;

    listenToClickCloseOverlay();
    
}

const listenToClickCloseOverlay = function()
{
    const button = document.querySelector(".js-button-close");

    button.addEventListener("click",function(){
        html_overlay.classList.add("c-visible");
        html_overview.classList.remove("c-opacity");
        
    });
}

// 2 De API ophalen.
const getAPI = async() => {
    // Met de fetch API proberen we de data op te halen.
    let teller = 1;
    let data ="";
    while (teller > 9)
    {

        console.log(data);
        teller += 1;
    }
    data = await fetch(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`)
        .then (r => r.json())
        .catch((err) => console.error("An error occured :", err));
    console.log(data);
 
    // Als dat gelukt is, gaan we naar onze showResult functie.
    ShowMovies(data);
};

const getGenreList = async()=>{
    // Met de fetch API proberen we de data op te halen.
   lstGenres = await fetch(`
    https://api.themoviedb.org/3/genre/list?api_key=${KEY}`)
        .then (r => r.json())
        .catch((err) => console.error("An error occured :", err));
    // console.log(list);
    // Als dat gelukt is, gaan we naar onze showResult functie.
};

//#region ***  INIT / DOMContentLoaded  ***
const init = function () {
    html_overview = document.querySelector(".js-overview");
    html_overlay = document.querySelector(".js-overlay");
    console.log("init");
    console.log("test script");
    getAPI();
    getGenreList();

    // getGenreList();
    
};

document.addEventListener("DOMContentLoaded", init);