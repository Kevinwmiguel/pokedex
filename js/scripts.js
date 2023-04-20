const LoadMore = document.getElementById('LoadMore')
const pokemonList = document.getElementById('pokemonList')
const limit = 10;
let offset = 0;
const maxrecord = 151

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
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
    })

}

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