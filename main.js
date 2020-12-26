const numOfPokemon = 150;
const numOfBoxes = 4;

let audio = new Audio('./sounds/pokeball-opening.mp3');

let pokemon = [];
let currentPokemons = [];

// fetch random pokemon
const fetchRandomPokemon = async () => {
    try {
        // generate a random number for random id
        const randomNum = Math.ceil(Math.random() * numOfPokemon);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

// when draw button is click fetch random pokemon
const btnStart = document.querySelector('.btn-start')
btnStart.addEventListener('click', async () => {

    for (let i = 1; i <= numOfPokemon; i++) {
        pokemon = await fetchRandomPokemon();
        await showRandomPokemon(pokemon, i);
    }
    // plag bg music
    let bgAudio = new Audio('./sounds/pokemon-bg-music.mp3');
    bgAudio.play();
    await generateLuckyPokemon(currentPokemons);
    document.getElementById('battle').removeAttribute('disabled');

})



// show random pokemon in the box
const showRandomPokemon = (pokemon, num) => {
    let box = document.querySelector(`.container .box:nth-child(${num})`);
    if (box) {
        box.innerHTML = `
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id
            }.png" alt="${pokemon.name}" class="pokemon-image"/>
        `;
        currentPokemons.push(pokemon.id);
    }
}


//generate random pokemon from the pool
generateLuckyPokemon = async (pokemons) => {
    // get Random pokemon from the current pokemons
    let random = Math.floor(Math.random() * 5);
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemons[random]}`);
        // const image = await axios.get(`https://pokeres.bastionbot.org/images/pokemon/${res.data.id}.png`)

        const getLuckyPokemonBtn = document.querySelector('.btn-get-pokemon');
        getLuckyPokemonBtn.addEventListener('click', () => {
            const pokemon = res.data;
            console.log(pokemon.name);
            const overlapPokemon = document.querySelector('.overlap-pokemon');
            const showPokemon = document.querySelector('.show-pokemon');
            let time = 3;
            const displayPokemon = setInterval(() => {
                if (time >= 0) {
                    overlapPokemon.classList.add('shown');
                    time--;
                } else {
                    overlapPokemon.classList.remove('shown')

                    showPokemon.innerHTML = `
                        <div class="pokemon-image-screen">
                            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id
                        }.png" alt="${pokemon.name}" />
                            <div class="title">
                                <p>You've got </p>
                                <h2 > ${pokemon.name}</h2>
                                <h5>Type: ${pokemon.types[0].type.name}</h5>
                                <button onClick="closePokemon()">close</button>
                            </div>
                        </div>

                        `;
                        // play open audio for 2 seconds
                        setTimeout(()=>{

                            audio.play();

                            setTimeout(()=>{
                                audio.pause();
                            }, 2000)

                        }, 20)

                }
            }, 1000);

            showPokemon.style.display = "block";




        })
    } catch (err) {
        alert(err);
    }
}

closePokemon = ()=>{
    const showPokemon = document.querySelector('.show-pokemon');
    showPokemon.style.display="none";
    setTimeout(()=>{
        location.reload();
    },1000);

}



