let IdSearch = 1;
const pokeTypeImg = document.querySelector("#pokeTypeImg")
const pokeType = document.querySelector("#pokeType")
const pokeName = document.querySelector("#pokeName")
const pokeHeight = document.querySelector("#pokeHeight")
const pokeWeight = document.querySelector("#pokeWeight")
const pokeAbilities = document.querySelector("#pokeAbilities")
const pokeImg = document.querySelector("#pokeImg")
const pokeStats = document.querySelector("#pokeStats")
const goprev = document.querySelector("#goprev")
const gonext = document.querySelector("#gonext")
const shuffle = document.querySelector("#shuffle")
let bgId = document.querySelector("#bgId")


function fadeInPokemon(){
    pokeImg.style="--animate-duration: 0.8s";
    pokeImg.classList.remove("animate__bounceOutDown")
    pokeImg.classList.add("animate__bounceInDown")
}
function fadeOutPokemon() {
    pokeImg.style="--animate-duration: 0.8s";
    pokeImg.classList.remove("animate__bounceInDown")
    pokeImg.classList.add("animate__bounceOutDown")
}

goprev.addEventListener("click", function (){
    if (IdSearch > 1) {
        IdSearch--
        fadeOutPokemon();
        fetchPokemon(IdSearch, true);
    }
})
gonext.addEventListener("click", function () {
    IdSearch++;
    fetchPokemon(IdSearch);
    fadeOutPokemon();

  });

  shuffle.addEventListener("click",function (){
    IdSearch = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(IdSearch);
    fadeOutPokemon();
  })



function fetchPokemon(id){
    fetch("https://pokeapi.co/api/v2/pokemon/"+id)
    .then(response => response.json ())
    .then(data => {
        setTimeout(()=>{
            replaceContent(data)
            fadeInPokemon();
        },"500")
    });
}

function replaceContent(data) {
    pokeName.textContent = data.name;
    pokeType.textContent = data.types[0].type.name;
    pokeImg.src = "assets/pokemon/" + IdSearch + ".png"
    pokeTypeImg.src = "assets/type/" + data.types[0].type.name + ".svg"
    bgId.textContent = formateNumber(IdSearch);
    pokeHeight.textContent = getCorrectValue(data.height) + "M"
    pokeWeight.textContent = getCorrectValue(data.weight) + "KG"
    const allAbilities = data.abilities.map(e => e = e.ability.name);
    pokeAbilities.textContent = allAbilities.join(', ')
    document.body.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.63) 0%, rgba(0, 0, 0, 0.63) 100%)," + colors[data.types[0].type.name]
    pokeStats.innerHTML = "";
    data.stats.slice(0, 3).forEach(element => {
        pokeStats.innerHTML += `  <div class="pb-4 row align-items-center">
        <span class="text-capitalize col-4 col-lg-3 m-0">${element.stat.name}</span>
        <div class="progress p-0 col-7 col-lg-8 bg-transparent" role="progressbar" aria-label="Basic example"
            aria-valuenow="${element.base_stat}" aria-valuemin="0" aria-valuemax="150">
            <div class="progress-bar animate__animated animate__slideInLeft bg-white" style="width: ${element.base_stat / 1.5}%;"></div>
        </div>
        <h5 class="col-1 text-end m-0">${element.base_stat}</h5>
    </div>`
    })  
}



// Vous recevrez de l'API un type "fire" ou "grass" ou "steel"... Changez le fond en fonction du type
const colors = {
    fire: "#ff7402",
    grass: "#33a165",
    steel: "#00858a",
    water: "#0050ac",
    psychic: "#c90086",
    ground: "#c90086",
    ice: "#70deff",
    flying: "#5d4e75",
    ghost: "#4d5b64",
    normal: "#753845",
    poison: "#7e0058",
    rock: "#6e1a00",
    fighting: "#634136",
    dark: "#272625",
    bug: "#6e1a00",
    dragon: "#00c431",
    electric: "#bba909",
    fairy: "#d31c81",
    unknow: "#757575",
    shadow: "#29292c",
}



// 1 -> #001 (Utile pour l'affichage du numéro de fond)
function formateNumber(number) {
    let str = "" + number
    let pad = "000"
    let ans = "#" + pad.substring(0, pad.length - str.length) + str;
    return ans;
}
console.log(formateNumber(IdSearch))
// Transforme la Height et la Weight sous bon format
function getCorrectValue(value) {
    if (value < 10) {
        return "0." + value;
    } else {
        let splitted = value.toString().split('');
        splitted.splice(splitted.length-1 , 0, ".");
        return splitted.join('');
    }
}