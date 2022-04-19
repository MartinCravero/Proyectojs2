window.onload = () =>{
//VARIABLES// 

    const apikey = 'IqNkQ8nTgBWKmwHJJFoJnLjUfHXZ5JD0';
    const gifosResults = document.getElementById('gifosResults');
    let makeGifBtn = document.getElementById("makeGifBtn");
    let makeHover = document.getElementById("makeHover");
    const moreResults = document.getElementById('moreResults');
    let moreResultsButt = document.getElementById('moreResultsButt');
    let moreResultsButtHover = document.getElementById('moreResultsButtHover');
    let trendGifos = document.getElementById('trend-gifos');
    let startingPosition = 0;
    const linkTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}`;
    let body = document.getElementById("body");
    let btnDarkMode = document.getElementById('btnDarkMode');
    let logoMobile = document.getElementById('logo-mobile');
    let trendingP = document.getElementById('trendingP');
    let gifFavorites = []; 
    let btnDarkMobile = document.getElementById('btnDarkMobile');
    let burger = document.getElementById('burger');
    let crossBurger = document.getElementById('crossBurger');
    let sliderLeft = document.getElementById('sliderLeft');
    let sliderRight = document.getElementById('sliderRight');


//////MODO NOCTURNO//////

darkMode(btnDarkMobile);
darkMode(btnDarkMode);



//RENDERIZACIÓN DE IMÁGENES//


    if (localStorage.getItem("dark-mode") === "true"){
        body.classList.add("dark");
        logoMobile.setAttribute("src", "./iconos/logo-mobile-modo-noct.svg");
        makeGifBtn.setAttribute("src", "./iconos/CTA-crear-gifo-modo-noc.svg");
        makeHover.setAttribute("src", "./iconos/CTA-crear-gifo-hover-modo-noc.svg");
        moreResultsButt.setAttribute("src", "./iconos/CTA-ver+-modo-noc.svg");
        moreResultsButtHover.setAttribute("src", "./iconos/CTA-ver+hover-modo-noc.svg");
        burger.setAttribute("src", "./iconos/burger-modo-noct.svg");
        crossBurger.setAttribute("src", "./iconos/close-modo-noct.svg");
        sliderLeft.setAttribute("src", "./iconos/button-slider-left-md-noct.svg");
        sliderRight.setAttribute("src", "./iconos/button-slider-right-md-noct.svg");
        btnDarkMode.innerHTML = "MODO DIURNO";
        btnDarkMobile.innerHTML = "MODO DIURNO";
    } else {
        body.classList.remove("dark");
        logoMobile.setAttribute("src", "./iconos/logo-mobile.svg");
        makeGifBtn.setAttribute("src", "./iconos/button-crear-gifo.svg");
        makeHover.setAttribute("src", "./iconos/CTA-crear-gifo-hover.svg");
        moreResultsButt.setAttribute("src", "./iconos/CTA-ver-mas.svg");
        moreResultsButtHover.setAttribute("src", "./iconos/CTA-ver-mas-hover.svg");
        burger.setAttribute("src", "./iconos/burger.svg");
        crossBurger.setAttribute("src", "./iconos/close.svg");
        sliderLeft.setAttribute("src", "./iconos/button-slider-left.svg");
        sliderRight.setAttribute("src", "./iconos/Button-Slider-right.svg");
        btnDarkMode.innerHTML = "MODO NOCTURNO";
        btnDarkMobile.innerHTML = "MODO NOCTURNO";
    }




/////FUNCIONES/////

    function darkMode (btnSwitch){
        btnSwitch.addEventListener("click", ()=>{
            body.classList.toggle("dark")
            if (document.body.classList.contains("dark")){
                localStorage.setItem("dark-mode", "true");
                logoMobile.setAttribute("src", "./iconos/logo-mobile-modo-noct.svg");
                makeGifBtn.setAttribute("src", "./iconos/CTA-crear-gifo-modo-noc.svg");
                makeHover.setAttribute("src", "./iconos/CTA-crear-gifo-hover-modo-noc.svg");
                moreResultsButt.setAttribute("src", "./iconos/CTA-ver+-modo-noc.svg");
                moreResultsButtHover.setAttribute("src", "./iconos/CTA-ver+hover-modo-noc.svg");
                burger.setAttribute("src", "./iconos/burger-modo-noct.svg");
                crossBurger.setAttribute("src", "./iconos/close-modo-noct.svg");
                sliderLeft.setAttribute("src", "./iconos/button-slider-left-md-noct.svg");
                sliderRight.setAttribute("src", "./iconos/button-slider-right-md-noct.svg");
                btnSwitch.innerHTML = "MODO DIURNO";
            } else {
                localStorage.setItem("dark-mode", "false");
                logoMobile.setAttribute("src", "./iconos/logo-mobile.svg");
                makeGifBtn.setAttribute("src", "./iconos/button-crear-gifo.svg");
                makeHover.setAttribute("src", "./iconos/CTA-crear-gifo-hover.svg");
                moreResultsButt.setAttribute("src", "./iconos/CTA-ver-mas.svg");
                moreResultsButtHover.setAttribute("src", "./iconos/CTA-ver-mas-hover.svg");
                burger.setAttribute("src", "./iconos/burger.svg");
                crossBurger.setAttribute("src", "./iconos/close.svg");
                sliderLeft.setAttribute("src", "./iconos/button-slider-left.svg");
                sliderRight.setAttribute("src", "./iconos/Button-Slider-right.svg");
                btnSwitch.innerHTML = "MODO NOCTURNO";
            }
        })
    }

    function expandGiff(e,a,u){
        e.addEventListener("click", ()=>{
            console.log("hice click")
            a.classList.add("active");
        })
        u.addEventListener("click", ()=>{
            console.log("hice click")
            a.classList.remove("active");
        })
    }

    function favoriteGiff (fav,noFav,response){
        fav.addEventListener("click", ()=>{
            console.log("click corazon")
            fav.style.display="none";
            noFav.style.display="inline-block";
            if (gifFavorites.includes(response)){
                return
            } else{
            gifFavorites.push(response)
            localStorage.setItem("gifFavorites", gifFavorites);
            }
        })

        noFav.addEventListener("click", () => {
            console.log("click sin corazon")
            let newGifFavorites = gifFavorites.filter(x => x !== response)
            gifFavorites = newGifFavorites
            localStorage.setItem("gifFavorites", newGifFavorites)
            fav.style.display="inline-block";
            noFav.style.display="none";
        })
    }

    function downloadGif(a,url, filename){
        a.addEventListener("click",() => {
            fetch(url).then(
                (response) => {
                    return response.blob().then(
                        (response) => {
                            let newElement = document.createElement('a')
                            newElement.href = URL.createObjectURL(response)
                            newElement.setAttribute('download', filename)
                            newElement.click()
                        }
                    )   
                }
            )
        })
    }

//////SECCION MIS GIF//////

    async function getGifFavorites (){
        let gifMyGifs = localStorage.getItem("MyGifs") ? JSON.parse(localStorage.getItem("MyGifs")) : [];
        let linkSearchMygifs = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${gifMyGifs}`
        let response = await fetch(linkSearchMygifs)
        response = response.json()
        return response
    }

    getGifFavorites().then(response=>{
        console.log(response)
        if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
            let gifSearchs = document.createElement("div")
            gifSearchs.classList.add('gif-search')
            gifSearchs.classList.add('gifGets')
            gifosResults.classList.add('myGif')
            gifSearchs.innerHTML=`
                                <div class="gifSearchCont" id="gifCont-${response.data[i].id}">
                                    <div class="gif-img gifSearchImg">
                                        <img src="${response.data[i].images.original.url}" alt="" class="gifRend" id="gifRend-${response.data[i].id}">
                                    </div>
                                    <div class="gifSearchHover" id="gifHover-${response.data[i].id}">
                                        <div class="buttons">
                                            <button class="favorites button-gif fav" id="Fav-${response.data[i].id}"><img src="./iconos/icon-fav.svg" alt=""></button>
                                            <button class="favorites button-gif noFav" id="NoFav-${response.data[i].id}"><img src="./iconos/icon-fav-activev2.svg" alt=""></button>
                                            <button class="button-gif down" id="Down-${response.data[i].id}"><img src="./iconos/icon-download.svg" alt=""></button>
                                            <button class="button-gif zoom" id="Zoom-${response.data[i].id}"><img src="./iconos/icon-max-normal.svg" alt=""></button>
                                        </div>
                                        <button class="button-gif close" id="Close-${response.data[i].id}"><img id="closeImg" src="./iconos/close.svg" alt=""></button>
                                        <div class="gif-text">
                                            <span class="text-user">${response.data[i].username}</span>
                                            <span class="text-name">${response.data[i].title}</span> 
                                        </div>
                                    </div>
                                </div>`
                                gifosResults.appendChild(gifSearchs)

//////FUNCIONES DE BOTONES DE GIF//////

///FUNCIÓN DE EXPANDIR CELULAR///
    let gifImg = document.getElementById(`gifRend-${response.data[i].id}`);
    let gifCont = document.getElementById(`gifCont-${response.data[i].id}`);
    let closeGif = document.getElementById(`Close-${response.data[i].id}`);
    expandGiff(gifImg, gifCont, closeGif);

///FUNCIÓN DE EXPANDIR ESCRITORIO///

    let Zoom = document.getElementById(`Zoom-${response.data[i].id}`);
    let closeImg = document.getElementById(`closeImg`);
    expandGiff(Zoom, gifCont, closeGif);

    if (document.body.classList.contains("dark")){
        console.log("cruz noct")
        closeImg.setAttribute("src", "./iconos/close-modo-noct.svg");
    } else {
        console.log("cruz diurna")
        closeImg.setAttribute("src", "./iconos/close.svg");
    };

    if (localStorage.getItem("dark-mode") === "true"){
        closeImg.setAttribute("src", "./iconos/close-modo-noct.svg");
    } else {
        closeImg.setAttribute("src", "./iconos/close.svg");
    };

///FUNCIÓN DESCARGAR GIF///

let downBtn = document.getElementById(`Down-${response.data[i].id}`);
let url = `${response.data[i].images['original'].url}`;
let filename = `${response.data[i].id}`;
downloadGif(downBtn,url,filename)

///FUNCIÓN AGREGAR A FAVORITOS///

    let FavBtn = document.getElementById(`Fav-${response.data[i].id}`)
    let NoFavBtn = document.getElementById(`NoFav-${response.data[i].id}`)
    favoriteGiff (FavBtn,NoFavBtn,response.data[i].id)

    }
    // moreResults.style.display="block"


    } else {
    console.log("vacío")
    let noGifContainer = document.createElement("div")
    gifosResults.classList.add('noFavorites')
    noGifContainer.innerHTML=`
        <div class="myGifNoCont">
            <img class="myGifNoContImg" src="./iconos/icon-mis-gifos-sin-contenido.svg" alt="">
            <h2 class="myGifNoContText">"¡Anímate a crear tu primer GIFO!"</h2>
        </div>`
    gifosResults.appendChild(noGifContainer)
    }

/////FUNCTION MORE RESULTS/////
    let gifGets = document.querySelectorAll('.gifGets');
    console.log(gifGets);
    let quantityGif = 12;

    setDisplayGifs();

    function setDisplayGifs() {

        if (quantityGif > gifGets.length){
            quantityGif = gifGets.length;
            moreResults.style.display="none";
        }
        for (let i = 0; i < quantityGif; i++) {
            gifGets[i].style.display="block";
        }
    }

    moreResults.addEventListener('click', ()=>{
        quantityGif = quantityGif + 12;
        setDisplayGifs();
    })

})

//////SECTION TRENDING//////

async function getGifTrending() {
    let response = await fetch (linkTrending)
    response = await response.json()
    return response
}
getGifTrending().then(
    (response) => {
        for (let i = 0; i < 3; i++) {
            let gifTrend = document.createElement('div')
            gifTrend.classList.add('gif-cont')
            gifTrend.innerHTML = `
                                    <div class="gif-container" id="gifContTrend-${response.data[i].id}">
                                        <div class="gif-img">
                                            <img src="${response.data[i].images.original.url} alt="" class="gif-trending" id="gifTrendRend-${response.data[i].id}">
                                        </div>
                                        <div class="gif-hover" id="gifHover-${response.data[i].id}">
                                            <div class="buttons">
                                                <button class="button-gif fav" id="favTrend-${response.data[i].id}"><img src="./iconos/icon-fav.svg" alt=""></button>
                                                <button class="button-gif noFav" id="noFavTrend-${response.data[i].id}"><img src="./iconos/icon-fav-activev2.svg" alt=""></button>
                                                <button class="button-gif down" id="downTrend-${response.data[i].id}"><img src="./iconos/icon-download.svg" alt=""></button>
                                                <button class="button-gif zoom" id="zoomTrend-${response.data[i].id}"><img src="./iconos/icon-max-normal.svg" alt=""></button>
                                            </div>
                                            <button class="button-gif close" id="closeTrend-${response.data[i].id}"><img src="./iconos/close.svg" alt=""></button>
                                            <div class="gif-text">
                                                <span class="text-user">${response.data[i].username}</span>
                                                <span class="text-name">${response.data[i].title}</span> 
                                            </div>
                                        </div>
                                    </div>
            `
            trendGifos.appendChild(gifTrend)

//////FUNCIONES DE BOTONES DE GIF//////

///FUNCIÓN DE EXPANDIR CELULAR///

            let gifImg = document.getElementById(`gifTrendRend-${response.data[i].id}`);
            let gifCont = document.getElementById(`gifContTrend-${response.data[i].id}`);
            let closeGif = document.getElementById(`closeTrend-${response.data[i].id}`);
            expandGiff(gifImg, gifCont, closeGif);

///FUNCIÓN DE EXPANDIR ESCRITORIO///

            let ZoomTrend = document.getElementById(`zoomTrend-${response.data[i].id}`);
            let gifContTrend = document.getElementById(`gifContTrend-${response.data[i].id}`);
            let CloseTrend = document.getElementById(`closeTrend-${response.data[i].id}`);
            expandGiff(ZoomTrend, gifContTrend, CloseTrend);

///FUNCIÓN AGREGAR A FAVORITOS///

            let FavBtnTrend = document.getElementById(`favTrend-${response.data[i].id}`);
            let NoFavBtnTrend = document.getElementById(`noFavTrend-${response.data[i].id}`);
            favoriteGiff(FavBtnTrend,NoFavBtnTrend,response.data[i].id);

///FUNCIÓN DESCARGAR GIF///

            let downBtnTrend = document.getElementById(`downTrend-${response.data[i].id}`);
            let urlTrend = `${response.data[i].images['original'].url}`;
            let filenameTrend = `${response.data[i].id}`;
            downloadGif(downBtnTrend,urlTrend,filenameTrend)

        }
        console.log(response)
    }
)

}