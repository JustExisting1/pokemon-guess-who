const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

export interface Pokemon {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string; url: string } }[];
}

export const errorPokemon: Pokemon = {
    name: "Error",
    sprites: { front_default: "null" },
    types: [{ type: { name: "null", url: "null" } }],
    // types: { type: {name: "null", url: "null"} } ,
};

const getPokemon = async (index: number):Promise<Pokemon> => {
    try {
        const res = await (await fetch(pokeUrl + index)).json();
        return res as Pokemon;
    } catch (error) {
        return errorPokemon        
    }
};

export default getPokemon;
