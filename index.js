window.onload = () => {

//VARIABLES//    
    const apikey = 'IqNkQ8nTgBWKmwHJJFoJnLjUfHXZ5JD0';
    const searchWrapper = document.querySelector(".searchInput");
    const inputBox = searchWrapper.querySelector("input");
    const suggBox = searchWrapper.querySelector(".autocompletBox");
    const linkTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}`;
    let trendGifos = document.getElementById('trend-gifos');


//SECTION SEARCH//
    async function getGifSearch (userData) {
        let linkSearch = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${userData}&limit=3`;
        let response = await fetch (linkSearch)
        response = await response.json()
        return response
    }

    inputBox.onkeyup = (e)=>{
        let userData = e.target.value;
        if(userData){
            console.log(userData)
            getGifSearch(userData).then(
                (response)=>{
                    console.log(response)
                    for (let i = 0; i < 3; i++) {
                        let searchItem = document.createElement("li");
                        searchItem.innerHTML = `<li class="searchItem" id=name${[i]}>${response.data[i].name}</li>`
                        suggBox.appendChild(searchItem)
                        console.log(inputBox.value)
                    }
                    
            });
            
            if (inputBox.value === "" ){
                console.log(inputBox.value)
                while (suggBox.hasChildNodes()) {  
                    suggBox.removeChild(suggBox.firstChild);
                }
            }

            suggBox.classList.add("active");
            // showSuggestions(userValue);
            let allList = suggBox.querySelectorAll(".searchItem");
            for (let i = 0; i < allList.length; i++) {
                allList[i].setAttribute("onclick", "selectThis")
            }
        }else{
            suggBox.classList.remove("active");
        }
    }
    
    function select(element){
        let selectUserData = element.textContent;
        inputBox.value = selectUserData;
        searchWrapper.classList.remove("active");
    }

    // function showSuggestions(list){
    //     let valueImput;
    //     if(!response.data[i].name){
    //         userValue = inputBox.value;
    //         valueImput = '<li>'+ userValue +'</li>';

    //     }else{
    //         valueImput = list.join('');
    //     }
    //     suggBox.innerHTML = valueImput;
    // }

//SECTION TRENDING//

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
                                        <div class="gif-container">
                                            <div class="gif-img">
                                                <img src="${response.data[i].images.original.url} alt="" class="gif-trending" id="gif-trending">
                                            </div>
                                            <div class="gif-hover">
                                                <div class="buttons">
                                                    <button class="button-gif" id="butt-fav"><img src="./iconos/icon-fav.svg" alt=""></button>
                                                    <button class="button-gif" id="butt-down"><img src="./iconos/icon-download.svg" alt=""></button>
                                                    <button class="button-gif" id="butt-expand"><img src="./iconos/icon-max-normal.svg" alt=""></button>
                                                </div>
                                                <div class="gif-text">
                                                    <span class="text-user">User</span>
                                                    <span class="text-name">Nombre</span> 
                                                </div>
                                            </div>
                                        </div>
                `
                trendGifos.appendChild(gifTrend)
            }
            
        }
    )
}