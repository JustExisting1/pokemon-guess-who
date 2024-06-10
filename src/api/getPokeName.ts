const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

export interface Pokemon {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string; url: string } }[];
}

const getPokemon = async (index: number) => {
    //reject index below 0
    const res = await (await fetch(pokeUrl + index)).json();
    return res as Pokemon;
    // return  fetch(pokeUrl + index)
    //     .then((res) => res.json())
    //     .then((res) => {
    //         return res as Pokemon;
    //     });
};
export default getPokemon;
