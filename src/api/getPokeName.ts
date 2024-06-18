import axios from "axios";
import { useEffect, useState } from "react";

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

// const getPokemon = async (index: number): Promise<Pokemon> => {
//     try {
//         const res = await (await fetch(pokeUrl + index)).json();
//         return res as Pokemon;
//     } catch (error) {
//         return errorPokemon;
//     }
// };

const usePokemonAsync = (index: number) => {
    const [pokemon, setPokemon] = useState(errorPokemon);
    // const [isLoading, setIsLoading] = useState(true);   //Add this feature

    useEffect(() => {
        //Abort controller for managing requests
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchPokemon = async () => {
            try {
                const { data } = await axios.get(pokeUrl + index, {
                    signal,
                }); //Fetch data based on index given
                setPokemon(data as Pokemon); //set fetched data
                // setError(null); //clear previous errors
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Fetch aborted"); //Intentionally aborted
                    return; //Stop further error handlingD
                }
                console.log("There was an error fetching pokemon: ", error); //Log Error
                // setError("error"); //Handle and set error message
            } finally {
                // setIsLoading(false); //Turn off loading indicator
            }
        };

        fetchPokemon(); //Trigger on component mount

        return () => {
            abortController.abort(); //Cancel any ongoing requests
            // setIsLoading(true); //Reset loading state
        };
    }, [index]); //Rerun the effect when "Index" changes

    return pokemon; //Return the data
};

// export default getPokemon;
export default usePokemonAsync;
