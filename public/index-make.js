window.onload = () =>{

    
    //VARIABLES// 
    let body = document.getElementById("body");
    let btnDarkMode = document.getElementById('btnDarkMode');
    let logoMobile = document.getElementById('logo-mobile');
    let mainCamara = document.getElementById('mainCamara');
    let makeFilm = document.getElementById('makeFilm');
    let btnDarkMobile = document.getElementById('btnDarkMobile');
    let makeButtonStar = document.getElementById('makeButtonStar');
    let makeButtonRec = document.getElementById('makeButtonRec');
    let makeButtonFinish = document.getElementById('makeButtonFinish');
    let makeButtonUpload = document.getElementById('makeButtonUpload');
    let video = document.getElementById('video');
    let mainTitle = document.getElementById('mainTitle');
    let secondTitle = document.getElementById('secondTitle');
    let secondText = document.getElementById('secondText');
    let button1 = document.getElementById('button1');
    let button2 = document.getElementById('button2');
    let button3 = document.getElementById('button3');
    let timerCounter = document.getElementById('makeCounter');
    let goBack = document.getElementById('goBack');
    let videoHover = document.getElementById('videoHover');
    let imgHover = document.getElementById('imgHover');
    let videoHoverText = document.getElementById('videoHoverText');
    let recorder = 0;
    let tracks = 0;
    let tiempo = 0;
    let videoCurrentTime = 0;
    let recordedGif = 0;
    let form = new FormData();
    let apikey = "IqNkQ8nTgBWKmwHJJFoJnLjUfHXZ5JD0"
    let linkUp = `https://upload.giphy.com/v1/gifs?api_key=${apikey}`
    let linkDown = `https://api.giphy.com/v1/gifs?api_key=${apikey}`

//////MODO NOCTURNO//////

    darkMode(btnDarkMobile);
    darkMode(btnDarkMode);


//RENDERIZACIÓN DE IMÁGENES//


    if (localStorage.getItem("dark-mode") === "true"){
        body.classList.add("dark");
        logoMobile.setAttribute("src", "./iconos/logo-mobile-modo-noct.svg");
        mainCamara.setAttribute("src", "./iconos/camara-modo-noc.svg");
        makeFilm.setAttribute("src", "./iconos/pelicula-modo-noc.svg");
        btnDarkMode.innerHTML = "MODO DIURNO";
        btnDarkMobile.innerHTML = "MODO DIURNO";
    } else {
        body.classList.remove("dark");
        logoMobile.setAttribute("src", "./iconos/logo-mobile.svg");
        mainCamara.setAttribute("src", "./iconos/camara.svg");
        makeFilm.setAttribute("src", "./iconos/pelicula.svg");
        btnDarkMode.innerHTML = "MODO NOCTURNO";
        btnDarkMobile.innerHTML = "MODO NOCTURNO";
    }




/////FUNCIONES/////

// FUNCION MODO NOCTURNO //

    function darkMode (btnSwitch){
        btnSwitch.addEventListener("click", ()=>{
            body.classList.toggle("dark")
            if (document.body.classList.contains("dark")){
                localStorage.setItem("dark-mode", "true");
                logoMobile.setAttribute("src", "./iconos/logo-mobile-modo-noct.svg");
                mainCamara.setAttribute("src", "./iconos/camara-modo-noc.svg");
                makeFilm.setAttribute("src", "./iconos/pelicula-modo-noc.svg");
                btnSwitch.innerHTML = "MODO DIURNO";
            } else {
                localStorage.setItem("dark-mode", "false");
                logoMobile.setAttribute("src", "./iconos/logo-mobile.svg");
                mainCamara.setAttribute("src", "./iconos/camara.svg");
                makeFilm.setAttribute("src", "./iconos/pelicula.svg");
                btnSwitch.innerHTML = "MODO NOCTURNO";
            }
        })
    }

// FUNCION DE GRABADO //

    function getStreamAndRecord () { 
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
            height: { max: 480 }
            }
        })
        .then(function(stream) {
            video.srcObject = stream;
            video.play()
            video.style.display="block";
            secondTitle.style.display="none";
            secondText.style.display="none";
            changeStyleNumber(button2);
            removeStyleNumber(button1);
            makeButtonRec.style.display="block";
            videoContainer.style.display="block";
            videoHover.style.display="none";

            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
            });
            tracks = stream.getTracks()
        })
    }

// FUNCIONES PARA CAMBIAR ESTILO DE NÚMERO DE PASOS //

    function changeStyleNumber(buttonNumb){
        buttonNumb.classList.add("active");
    }

    function removeStyleNumber(buttonNumb){
        buttonNumb.classList.remove("active");
    }

////// PASOS GRAGACIÓN DE GIF //////

// PRIMER PASO (HABILITAR CAMARA)//

    makeButtonStar.addEventListener("click", ()=>{
        console.log("hice click")
        mainTitle.style.display="none";
        mainText.style.display="none";
        secondTitle.style.display="block";
        secondText.style.display="block";
        changeStyleNumber(button1)
        makeButtonStar.style.display="none";
        getStreamAndRecord()
    })

// SEGUNDO PASO (COMENZAR A GRABAR)//

    makeButtonRec.addEventListener("click", ()=>{


        recorder.startRecording()
        tiempo = setInterval(timerCount, 1000);
        video.currentTime = videoCurrentTime;
        function timerCount (){
            let sec = parseInt(video.currentTime % 60);
            let min = parseInt((video.currentTime / 60) % 60);
            timerCounter.style.display="block";
            timerCounter.innerHTML= `00:${min}:${sec}`
        }
        timerCounter.style.display="block";
        makeButtonFinish.style.display="block";
        makeButtonRec.style.display="none";
    })

// TERCER PASO (PARAR LA GRABACIÓN) //

    makeButtonFinish.addEventListener("click", () => {
        recorder.stopRecording(function (){
            recordedGif = recorder.getBlob();
            console.log(recordedGif);
        });
        video.pause()
        tracks.forEach(function(track) {
            track.stop();
        });
        clearInterval(tiempo);
        timerCounter.style.display="none";
        makeButtonFinish.style.display="none";
        makeButtonUpload.style.display="block";
        goBack.style.display="block";
    })

// REPETIR CAPTURA //

    goBack.addEventListener("click", ()=>{
        makeButtonUpload.style.display="none";
        goBack.style.display="none";
        getStreamAndRecord()
    })

// SUBIR GIF A LA PÁGINA //

    let uploadedGif = localStorage.getItem('MyGifs') ? JSON.parse(localStorage.getItem('MyGifs')) : [];

    makeButtonUpload.addEventListener("click", ()=>{
        makeButtonUpload.style.display="none";
        goBack.style.display="none";
        changeStyleNumber(button3);
        removeStyleNumber(button2);
        videoHover.style.display = "flex";

        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));

        uploadGif(form).then(response =>{
            console.log(response)
            renderSuccess(response)
        }).catch(error => console.error)
    })

    async function uploadGif (form){
        let response = await fetch(linkUp, {
            method: 'POST',
            body: form
        })
        return response.json()
    }

    function renderSuccess (response){
        uploadedGif.push(response.data.id);
        localStorage.setItem('MyGifs', JSON.stringify(uploadedGif))
        imgHover.setAttribute('src','./iconos/ok.svg');
        videoHoverText.innerHTML = 'GIFO subido con éxito';

        let buttonsMyGif = document.createElement('div');
        buttonsMyGif.classList.add('buttonsMyGif');
        buttonsMyGif.innerHTML = 
        `
        <button class="button-gif MyGifDown" id="Down-${response.data.id}"><img src="./iconos/icon-download.svg" alt=""></button>
        <button class="button-gif MyGifLink" id="Link-${response.data.id}"><img src="./iconos/icon-link-normal.svg" alt=""></button>
        `
        videoHover.appendChild(buttonsMyGif);
        let buttonMyGifDown = document.getElementById(`Down-${response.data.id}`)
        buttonMyGifDown.addEventListener('click', () =>{
            let urlFetchMyGif = `${linkDown}&ids=${response.data.id}`
            searchUploadMyGif(urlFetchMyGif)
        })
    }

// FETCH PARA DESCARGAR EL GIF CREADO //

    async function searchUploadMyGif(urlFetchMyGif){
        let response = await fetch(urlFetchMyGif)
        response = await response.json()
        console.log(response)
        let filename = `${response.data[0].id}`
        let urlForDownload = `${response.data[0].images.original.url}`
        downloadGif(urlForDownload, filename)
    }

// FUNCION DE DESCARGA //
    function downloadGif(url, filename){
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
    }
}