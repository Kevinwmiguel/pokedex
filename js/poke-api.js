const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    pokemon.abilities = abilities

    pokemon.base_experience = pokeDetail.base_experience
    pokemon.height = pokeDetail.height


    const stat = pokeDetail.stats.map((stat) => stat.stat.name)
    pokemon.stat = stat

    const bstatus = pokeDetail.stats.map((stats) => stats.base_stat)
    pokemon.stats = bstatus

    const weight = pokeDetail.weight
    pokemon.weight = weight

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}

pokeApi.getPokemonById = (pkId) => {
    if (!pkId) {
        return Promise.reject("INVALID INFORMATION");
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pkId}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => convertPokeApiDetailToPokemon(jsonBody))
        .then((detailRequest) => Promise.resolve(detailRequest))
        .catch((error) => console.error(error));
};