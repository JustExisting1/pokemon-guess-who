import React, { useEffect, useState } from "react";
import getPokemon, { Pokemon } from "../api/getPokeName";
import getRandomInt from "../utils/randomInt";
import Tile from "./Tile";

const maxRange = 1025;

const errorPokemon: Pokemon = {
    name: "Error",
    sprites: { front_default: "null" },
    types: [{ type: { name: "null", url: "null" } }],
    // types: { type: {name: "null", url: "null"} } ,
};

const createBoard = async (amount: number): Promise<Pokemon[]> => {
    const table: Pokemon[] = [];
    for (let i = 0; i < amount; i++) {
        try {
            // ----------- Ensure no duplicate numbers ----------------
            const data = await getPokemon(getRandomInt(1, maxRange));
            table.push(data);
        } catch (error) {
            //table.push({ name: "Error", sprites: { front_default: "null" } });
            //Fix Error Pokemon
            table.push(errorPokemon);
        }
    }
    return table;
};

const Board: React.FC<{ boardSize: number }> = ({ boardSize }) => {
    const [boardState, setBoardState] = useState<Pokemon[]>([]);

    useEffect(() => {
        createBoard(boardSize).then((data) => setBoardState(data));
    }, [boardSize]);

    //const tiles:JSX.Element = []
    // boardState.map((i) => {
    //     tiles.push(<Tile name={i.name} image={i.sprites.front_default} />);
    //     });
    return boardState.map((each) => (
        <div>
            <Tile pokemon={each} />
        </div>
    ));
};

export default Board;

