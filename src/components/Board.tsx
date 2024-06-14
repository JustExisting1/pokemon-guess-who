import React, { useEffect, useState } from "react";
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
