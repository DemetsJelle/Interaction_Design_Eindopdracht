"use strict";
let html_overview;
let html_details;
let teller = 0;
let detailsTeller = 0;
let lstGenres ="";

const ShowMovies = function(jsonObject){

    html_overview.innerHTML="";
    let htmlstring_movies = "";
    
    for(const item of jsonObject.results){
        htmlstring_movies =`<div class="panel">
                                <div class="o-layout o-layout--justify-space-between">
                                    <div class="c-picture">
                                        <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" alt="Image Movie"/>
                                    </div>
                                <div class="c-text">
                                    <p class="c-title">${item.title}</p>
                                    <p class="c-date">${item.release_date}</p>
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
            if(b.getAttribute("data-IsVisible") == 0)
            {
                ShowDetailsMovie(jsonObject[b.getAttribute("data-counter")], b.getAttribute("data-counter"));
                b.setAttribute("data-IsVisible",1);
            }
            else if(b.getAttribute("data-IsVisible") == 1)
            {
                CloseDetailsMovie(b.getAttribute("data-counter"));
                b.setAttribute("data-IsVisible",0);
            }
            
        });
    };
}

const ShowDetailsMovie = function(jsonObject, counter)
{
    
    html_overview = document.querySelector(`.js-details${counter}`);
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


    let htmlstring_details = ` <section class="o-row">
    <div class="o-container">
        <div class="o-layout o-layout--align-center o-layout--justify-center">
            <div class ="c-tab">
                <div class="c-upper">
                    <div class="c-image">
                        <img class="c-pictest" src="https://image.tmdb.org/t/p/w200${jsonObject.poster_path}" alt="Image Movie"/>
                    </div>
    
                    <div class="c-main-info">
                        
                        <div class="c-main-info__textarea">
                            <p class="c-main-info__text">Titel:</p>
                            <p class="c-main-info__text-js">${jsonObject.title}</p>
                        </div>

                        <div class="c-main-info__textarea">
                            <p class="c-main-info__text">Datum:</p>
                            <p class="c-main-info__text-js">${jsonObject.release_date}</p>
                        </div>

                        <div class="c-main-info__textarea">
                            <p class="c-main-info__text"><i class="c-arrow down" ></i></p>
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
                            <p class="c-info-details__text">Language:</p>
                            <p class="c-info-details__text-js">${jsonObject.original_language}</p>
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
    html_overview.innerHTML = htmlstring_details;
    
}


const CloseDetailsMovie = function(counter)
{
    html_overview = document.querySelector(`.js-details${counter}`);
    let htmlstring_details = "";
    html_overview.innerHTML = htmlstring_details;
};

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
    html_overview = document.querySelector(".js-overview")
    console.log("init");
    getAPI();
    getGenreList()
    // getGenreList();
    
};

document.addEventListener("DOMContentLoaded", init);