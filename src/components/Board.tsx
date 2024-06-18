import React, { useEffect, useState } from "react";
import Tile from "./Tile";

//Board needs to be given an array of index with
const Board: React.FC<{ board: number[] }> = ({ board }) => {
    const [boardState, setBoardState] = useState<{key:number, value:number}[]>([]);

    useEffect(() => {
        const boardKvP = []
        for (let index = 0; index < board.length; index++) {
            boardKvP.push({key:index, value:board[index]})            
        }
        setBoardState(boardKvP);
    }, [board]);



    return boardState.map((each) => (
        <div>
            <Tile pokeIndex={each.value} key={each.key} />
        </div>
    ));
};

export default Board;
