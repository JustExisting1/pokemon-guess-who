import axios from "axios";
import { useEffect, useState } from "react";

const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokeSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/"; //used for some stats

export interface Pokemon {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string; url: string } }[];
    species: Species;
}

export interface Species {
    //Species data
    is_legendary: boolean;
    is_mythical: boolean;
    generation: { name: string };
}

const errorSpecies: Species = {
    is_legendary: false,
    is_mythical: false,
    generation: { name: "generation-i" },
};

const errorPokemon: Pokemon = {
    name: "Error",
    sprites: { front_default: "null" },
    types: [{ type: { name: "null", url: "null" } }],
    species: errorSpecies,
};

const usePokemonAsync = (index: number): Pokemon => {
    const [pokemon, setPokemon] = useState(errorPokemon);
    const [species, setSpecies] = useState(errorSpecies);
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

        const fetchPokemonSpecies = async () => {
            try {
                const { data } = await axios.get(pokeSpeciesUrl + index, {
                    signal,
                }); //Fetch data based on index given
                setSpecies(data as Species);
                // setPokemon(data as Pokemon); //set fetched data
                // setError(null); //clear previous errors
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Fetch aborted"); //Intentionally aborted
                    return; //Stop further error handlingD
                }
                console.log("There was an error fetching pokemon species: ", error); //Log Error
                // setError("error"); //Handle and set error message
            } finally {
                // setIsLoading(false); //Turn off loading indicator
            }
        };

        fetchPokemon(); //Trigger on component mount
        fetchPokemonSpecies(); //Trigger on component mount

        return () => {
            abortController.abort(); //Cancel any ongoing requests
            // setIsLoading(true); //Reset loading state
        };
    }, [index]); //Rerun the effect when "Index" changes

    pokemon.species = species;
    return pokemon; //Return the data
};

// export default getPokemon;
export default usePokemonAsync;
