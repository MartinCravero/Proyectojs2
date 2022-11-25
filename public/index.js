window.onload = () => {

//VARIABLES//    
    const apikey = 'IqNkQ8nTgBWKmwHJJFoJnLjUfHXZ5JD0';
    const searchWrapper = document.querySelector(".searchInput");
    let makeGifBtn = document.getElementById("makeGifBtn");
    let makeHover = document.getElementById("makeHover");
    const inputBox = searchWrapper.querySelector("input");
    let suggBox = document.getElementById('autocompletBox');
    const gifosResults = document.getElementById('gifosResults');
    const moreResults = document.getElementById('moreResults');
    let moreResultsButt = document.getElementById('moreResultsButt');
    let btnMakeGif = document.getElementById('btnMakeGif');
    let moreResultsButtHover = document.getElementById('moreResultsButtHover');
    let trendGifos = document.getElementById('trend-gifos');
    let startingPosition = 0;
    let iconSearch = document.getElementById('iconSearch');
    let iconDelete = document.getElementById('iconDelete');
    let imgIconSearch = document.getElementById('imgIconSearch');
    let imgIconDelete = document.getElementById('imgIconDelete');
    let iconSearchItem = document.getElementById('iconSearchItem');
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
        imgIconSearch.setAttribute("src", "./iconos/icon-search-modo-noct.svg");
        imgIconDelete.setAttribute("src", "./iconos/close-modo-noct.svg");
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
        imgIconSearch.setAttribute("src", "./iconos/icon-search.svg");
        imgIconDelete.setAttribute("src", "./iconos/close.svg");
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
                imgIconSearch.setAttribute("src", "./iconos/icon-search-modo-noct.svg");
                imgIconDelete.setAttribute("src", "./iconos/close-modo-noct.svg");
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
                imgIconSearch.setAttribute("src", "./iconos/icon-search.svg");
                imgIconDelete.setAttribute("src", "./iconos/close.svg");
                burger.setAttribute("src", "./iconos/burger.svg");
                crossBurger.setAttribute("src", "./iconos/close.svg");
                sliderLeft.setAttribute("src", "./iconos/button-slider-left.svg");
                sliderRight.setAttribute("src", "./iconos/Button-Slider-right.svg");
                btnSwitch.innerHTML = "MODO NOCTURNO";
            }
        })
    }



    function removeChild(e){ 
        while (e.hasChildNodes()) {  
        e.removeChild(e.firstChild);
    }
    }

    function imgNocturna(e,a) {
        if (localStorage.getItem("dark-mode") === "true"){
            a.innerHTML = `<img class="iconSearchItem" id="iconSearchItem"src="./iconos/icon-search-modo-noct.svg" alt="">${e}`
        } else {
            a.innerHTML = `<img class="iconSearchItem" id="iconSearchItem"src="./iconos/icon-search.svg" alt="">${e}`
        }
    }


    function seeMore(e){
        moreResults.addEventListener("click", ()=>{
            startingPosition = startingPosition + 12;
            console.log(e);
            gifRender(e);
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

    function favoriteGiff (e,a,response){
        e.addEventListener("click", ()=>{
            console.log("click corazon")
            e.style.display="none";
            a.style.display="inline-block";
            if (gifFavorites.includes(response)){
                return
            } else{
            gifFavorites.push(response)
            localStorage.setItem("gifFavorites", gifFavorites);
            }
        })

        a.addEventListener("click", () => {
            console.log("click sin corazon")
            let newGifFavorites = gifFavorites.filter( x => x !== response)
            gifFavorites = newGifFavorites
            localStorage.setItem("gifFavorites", newGifFavorites)
            e.style.display="inline-block";
            a.style.display="none";
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

////////SECTION SEARCH////////


//FUNCIÓN QUE PEGA A ENDOPOINT DE SUGERIDOS//
    async function getGifSearch (userData) {
        let linkSearch = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${userData}&limit=4`;
        let response = await fetch(linkSearch)
        response = await response.json()
        return response
    }


    //FUNCIÓN PARA DETECTAR EVENTO DE AUTOCOMPLETADO//
    inputBox.onkeyup = (e)=>{
        let userData = e.target.value;
            if(userData !== ""){
                console.log(userData)
                getGifSearch(userData).then(
                    (response)=>{
                        
                            while (suggBox.lastElementChild) {
                                suggBox.removeChild(suggBox.lastElementChild);
                            };
                            for (let i = 0; i < 4; i++) {
                                let searchItem = document.createElement("li");
                                searchItem.setAttribute("class", "searchItem");
                                searchItem.setAttribute("id", `item ${[i]}`);
                                if (response.data.length > 0){
                                    imgNocturna(response.data[i].name, searchItem);
                                    suggBox.appendChild(searchItem)}
                                    console.log(inputBox.value)
                                    let itemSelect = document.getElementById(`item ${[i]}`);
                                    itemSelect.addEventListener("click", ()=>select(searchItem.textContent)
                                    )
                                    console.log(suggBox.firstChild.textContent)
                                    console.log(response)
                            }       
                        })
            suggBox.classList.add("active");
            iconSearch.classList.add("active");
            iconDelete.classList.add("active");
            let allList = suggBox.querySelectorAll(".searchItem");
            for (let i = 0; i < allList.length; i++) {
                allList[i].setAttribute("onclick", "selectThis");
            }
        } else{
            removeChild(suggBox)
            suggBox.classList.remove("active");
            iconSearch.classList.remove("active");
            iconDelete.classList.remove("active");
        }
    }

//LIMPIAR SUGERIDOS CUANDO EL IMPUT ESTÁ VACÍO//
    if (inputBox.value == "" ){
        console.log(inputBox.value)
        while (suggBox.hasChildNodes()) {  
            suggBox.removeChild(suggBox.firstChild);
        }
    }

//FUNCIÓN SELECT SEARCHITEM E INPUTVALUE//
    function select(searchItem){
        gifRender(searchItem);
        console.log(searchItem);
        seeMore(searchItem);
        removeChild(gifosResults);
        removeChild(suggBox);
        suggBox.classList.remove("active");
        searchWrapper.classList.remove("active");
        inputBox.value = "";
        iconSearch.classList.remove("active");
        iconDelete.classList.remove("active");
    }

    inputBox.addEventListener('keyup', (e) =>{
        if (e.keyCode === 13 ){
            resultEmpty = inputBox.value;
            console.log(resultEmpty);
            seeMore(resultEmpty);
            select(inputBox.value);
        }})

    let resultEmpty = "";
    iconSearch.addEventListener("click", ()=>{
        resultEmpty = inputBox.value;
        console.log(resultEmpty);
        seeMore(resultEmpty);
        select(inputBox.value);
    })

////////SECTION PINTAR GIFOS SEARCH////////

    async function gifRender(searchItem) {
        let response = await fetch (`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${searchItem}&offset=${startingPosition}`)
        response = await response.json()
        console.log(response)
        gifPrint(response)
        
    }

    function gifPrint(response){
        if (response.data.length !== 0) {
            for (let i = 0; i < 12; i++) {
                let gifSearchs = document.createElement("div")
                gifSearchs.classList.add('gif-search')
                gifSearchs.innerHTML=`
                                    <div class="gifSearchCont" id="gifCont-${response.data[i].id}">
                                        <div class="gif-img gifSearchImg">
                                            <img src="${response.data[i].images.original.url}" alt="" class="gifRend" id="gifRend-${response.data[i].id}">
                                        </div>
                                        <div class="gifSearchHover" id="gifHover-${response.data[i].id}">
                                            <div class="buttons">
                                                <button class="button-gif fav" id="Fav-${response.data[i].id}"><img src="./iconos/icon-fav.svg" alt=""></button>
                                                <button class="button-gif noFav" id="NoFav-${response.data[i].id}"><img src="./iconos/icon-fav-activev2.svg" alt=""></button>
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

///FUNCIÓN AGREGAR A FAVORITOS///

                let FavBtn = document.getElementById(`Fav-${response.data[i].id}`);
                let NoFavBtn = document.getElementById(`NoFav-${response.data[i].id}`);
                favoriteGiff (FavBtn,NoFavBtn,response.data[i].id);

///FUNCIÓN DESCARGAR GIF///

                let downBtn = document.getElementById(`Down-${response.data[i].id}`);
                let url = `${response.data[i].images['original'].url}`;
                let filename = `${response.data[i].id}`;
                downloadGif(downBtn,url,filename)
            }

            moreResults.style.display="block"
        }
        else {
            let gifSearchs2 = document.createElement("div")
            gifSearchs2.setAttribute("class", "searchEmpty");
            console.log(resultEmpty)
            gifSearchs2.innerHTML=`
                                <h2 class="resultEmptyTitle">${resultEmpty}</h2>
                                <img src="./iconos/icon-busqueda-sin-resultado.svg" class="imgNotResults" alt="">
                                <h2 class="resultEmptyText">Intenta con otra busqueda</h2>
                                `
            gifosResults.appendChild(gifSearchs2)
            }
    }


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
            trendingP.innerHTML = `${response.data[0].title}, ${response.data[1].title}, ${response.data[2].title}` 
        }
    )



}