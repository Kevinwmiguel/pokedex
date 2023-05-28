
const pokemonList = document.getElementById('pokemonList')
const pokeChoose = document.getElementById('pokeChoose')

/*butons*/
const LoadMore = document.getElementById('LoadMore')



const limit = 10;
let offset = 0;
const maxrecord = 151

let selectedPokemonId = null;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol >
                    
                    
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li >
        `).join('')

        pokemonList.innerHTML += newHtml
        const pkItems = document.querySelectorAll('.pokemon');
        pkItems.forEach(pkItem => {
            pkItem.addEventListener('click', () => {

                const pkId = pkItem.getAttribute('data-id');
                window.location.href = `pokedex/pokemon%20details.html?id=${pkId}`;
            });
        });
    });
}
const pkId = new URLSearchParams(window.location.search).get('id');

if (pkId) {
    pokeApi.getPokemonById(pkId).then((pokemon) => {

        const pokemonHtml = `
            <img id="img" class="pokemon" src="${pokemon.photo}"  alt="${pokemon.name}"> 
            <li id="information" class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="buttons">
                    <button id="skills">Skills</button>
                    <button id="Status">Status</button>
                    <button id="extra">Extra</button>
                </div>
               
                <div class="full-container">
                    <div id="Skills-inform">
                    </div>

                    <div id="status-inform">
                        <div class="box">
                            <span class="espaco hp">${pokemon.stat[0]}</span>
                            <span class="espaco">${pokemon.stats[0]}</span>
                            <span class="espaco attack">${pokemon.stat[1]}</span>
                            <span class="espaco">${pokemon.stats[1]}</span>
                            <span class="espaco defense">${pokemon.stat[2]}</span>
                            <span class="espaco">${pokemon.stats[2]}</span>
                            <span class="espaco special_attack">${pokemon.stat[3]}</span>
                            <span class="espaco">${pokemon.stats[3]}</span>
                            <span class="espaco special_defense">${pokemon.stat[4]}</span>
                            <span class="espaco">${pokemon.stats[4]}</span>
                            <span class="espaco speed">${pokemon.stat[5]}</span>
                            <span class="espaco">${pokemon.stats[5]}</span>
                        </div>
                    </div>

                    <div id="extra-inform">
                        <span id="extradt">Height:</span>
                        <span class="espaco">${pokemon.height}</span>
                        <span id="extradt1">Base experience:</span>
                        <span class="espaco">${pokemon.base_experience}</span>
                        <span id="extradt2">Weight:</span>
                        <span class="espaco">${pokemon.weight}</span>
                    </div>
                </div>    
            </li>`;
        pokeChoose.innerHTML = pokemonHtml
        const abilitiesDiv = document.getElementById('Skills-inform');
        for (let i = 0; i < pokemon.abilities.length; i++) {
            const ability = pokemon.abilities[i];
            const abilityElement = document.createElement('span');
            const abilityElements = document.createElement('br');
            abilityElement.innerText = ability;
            abilityElement.style.display = 'block';
            abilitiesDiv.appendChild(abilityElement);


        }
        var skills = document.getElementById('skills')
        var Skills_inform = document.getElementById('Skills-inform')
        Skills_inform.style.display = 'none'
        if (skills) {
            skills.addEventListener("click", () => {
                if (Skills_inform.style.display === 'none') {
                    Skills_inform.style.display = 'block'
                    if (Skills_inform.style.display === 'block') {
                        Skills_inform.style.display = 'grid'
                        Skills_inform.style.textTransform = 'uppercase'
                        Skills_inform.style.gridTemplateColumns = '1fr'
                        skills.style.background = '#b9b7cfda'
                    }
                } else {
                    Skills_inform.style.display = 'none'
                    skills.style.background = '#cccccc'
                }
            })
        }
        let Status = document.getElementById('Status')
        let Status_inform = document.getElementById('status-inform')
        Status_inform.style.display = 'none'
        if (Status) {
            Status.addEventListener("click", () => {
                if (Status_inform.style.display === 'none') {
                    Status_inform.style.display = 'block'
                    if (Status_inform.style.display === 'block') {
                        Status_inform.style.display = 'grid'
                        Status_inform.style.textTransform = 'uppercase'
                        Status_inform.style.gridTemplateColumns = '1fr'
                        Status.style.background = '#b9b7cfda'
                    }
                } else {
                    Status_inform.style.display = 'none'
                    Status.style.background = '#cccccc'
                }
            })
        }
        var extra = document.getElementById('extra')
        var extra_inform = document.getElementById('extra-inform')
        extra_inform.style.display = 'none'
        if (extra) {
            extra.addEventListener("click", () => {
                if (extra_inform.style.display === 'none') {
                    extra_inform.style.display = 'block'
                    if (extra_inform.style.display === 'block') {
                        extra_inform.style.display = 'grid'
                        extra_inform.style.textTransform = 'uppercase'
                        extra_inform.style.gridTemplateColumns = '1fr 1fr'
                        extra.style.background = '#b9b7cfda'
                    }
                } else {
                    extra_inform.style.display = 'none'
                    extra.style.background = '#cccccc'
                }
            })
        }

    })
} else {
    /*LoeadPokemons*/
    loadPokemonItens(offset, limit)
    LoadMore.addEventListener('click', () => {
        offset += limit
        const qtdRecord = offset + limit
        if (qtdRecord >= maxrecord) {
            const newLimit = maxrecord - offset
            loadPokemonItens(offset, newLimit)
            LoadMore.parentElement.removeChild(LoadMore)
        } else {
            loadPokemonItens(offset, limit)
        }
    })
}
