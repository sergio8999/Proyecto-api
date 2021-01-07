var peliculaBuscar,idPelicula;
var section,informacion;

function main(){
    let boton =  document.getElementsByTagName('button')[0];
    section = document.getElementById('divPeliculas');
    informacion = document.getElementById('informacion');

    boton.addEventListener('click',()=>{
        section.innerHTML = "";
        informacion.style.display = "none";
        let buscar = document.getElementById('buscar');
        peliculaBuscar = buscar.value;
        obtenerPeliculas();
        buscar.value = "";
    })
}


function obtenerPeliculas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        maquetarPeliculas(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", "https://www.omdbapi.com/?s="+peliculaBuscar+"&apikey=3ec76701", true);
    xhttp.send();
  }

  function obtenerInformacion() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        maquetarInformacion(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", "https://www.omdbapi.com/?i="+idPelicula+"&apikey=3ec76701", true);
    xhttp.send();
  }

  function maquetarPeliculas(ajax){

    let contInicial = 0,contMax = 0;
    
    let obtenerMas = document.getElementById('obtenerMas');
    
    if(ajax.Response != "False"){

        if(contInicial +5 < ajax.Search.length)
            contMax +=5;
        else{
            contMax = ajax.Search.length;
            obtenerMas.style.visibility = "hidden";
        }
        for(i=0;i<contMax;i++)
            maquetarPelicula(ajax.Search[i]);
        contInicial +=5;

        obtenerMas.style.visibility = "visible";

        // Mostrar 5 peliculas siguientes  al pulsar el boton obtener mas
        obtenerMas.addEventListener('click',()=>{
            if(contInicial +5 < ajax.Search.length)
                contMax +=5;
            else{
                contMax = ajax.Search.length;
                obtenerMas.style.visibility = "hidden";
            }
            for(i=contInicial;i<contMax;i++)
                maquetarPelicula(ajax.Search[i]);
            contInicial +=5;
        })

    }
    else{
        let parrafo = document.createElement('p');
        parrafo.textContent = 'No hay ninguna pelicula con el titulo "' + peliculaBuscar + '"';
        section.append(parrafo);
    }
  }

function maquetarPelicula(pelicula){
    let article = document.createElement('article');
    article.id = pelicula.imdbID;
            
    let titulo = document.createElement('h3');
    titulo.textContent = pelicula.Title;

    let imagen = document.createElement('img');
    imagen.src = pelicula.Poster;

    article.append(titulo);
    article.append(imagen);

    section.append(article);

    eventoInformacion(article);
}

function maquetarInformacion(ajax){
    let iconoCerrar = document.createElement("span");
    iconoCerrar.classList.add("material-icons");
    iconoCerrar.textContent = "clear";

    let titulo = document.createElement('h3');
    titulo.textContent = ajax.Title;
    
    let divImagen = document.createElement('div');
    divImagen.id = "divImagen";
    let imagen = document.createElement('img');
    imagen.src = ajax.Poster;
    divImagen.appendChild(imagen);

    let pAño = document.createElement('p');
    pAño.textContent = "Year: " + ajax.Year;

    let pActores = document.createElement('p');
    pActores.textContent = "Actors: "+ ajax.Actors;

    let pPlot = document.createElement('p');
    pPlot.textContent = "Plot: " + ajax.Plot; 

    let pLanguage = document.createElement('p');
    pLanguage.textContent = "Language: " + ajax.Language; 

    let pCountry = document.createElement('p');
    pCountry.textContent = "Country: " + ajax.Country;
    
    let pRatings = document.createElement('p');
    pRatings.textContent = "Ratings: " + ajax.Ratings[0].Value;

    informacion.append(iconoCerrar);
    informacion.append(titulo);
    informacion.append(divImagen);
    informacion.append(pAño);
    informacion.append(pActores);
    informacion.append(pPlot);
    informacion.append(pLanguage);
    informacion.append(pCountry);
    informacion.append(pRatings);

    iconoCerrar.addEventListener('click',()=>{
        informacion.style.display = "none";
        section.style.width = "100%";
    })    
}

  function eventoInformacion(pelicula){
    pelicula.addEventListener('click',e =>{
        idPelicula = e.currentTarget.id;
        informacion.innerHTML = "";
        section.style.width = "70vw";
        informacion.style.display = "initial";
        obtenerInformacion();
    })
  }

window.addEventListener('load',main);