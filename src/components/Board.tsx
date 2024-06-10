import React, { useEffect, useState } from "react";
import getPokemon, { Pokemon } from "../api/getPokeName";
import getRandomInt from "../utils/randomInt";
import Tile from "./Tile";

const Board: React.FC<{ board: number[] }> = ({ board }) => {
    const [boardState, setBoardState] = useState<number[]>([]);

    useEffect(() => {
        setBoardState(board);
    }, [board]);

    return boardState.map((each) => (
        <div>
            <Tile pokeIndex={each} />
        </div>
    ));
};

export default Board;
