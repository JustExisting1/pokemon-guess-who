import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import getRandomInt from "./utils/randomInt";
import Tile from "./components/Tile";

//Generate key for board
//Pick a random tile from the board key
//generate the passing in the board key

const maxRange = 1025;
const boardSize = 2;

const boardKey = (boardSize: number): number[] => {
    const key: number[] = [];
    for (let i = 0; i < boardSize; i++) {
        key.push(getRandomInt(0, maxRange));
    }
    return key;
};

const keyToUrl = (key: number[]) => {
    if (key.length == 0) {
        return null;
    }

    const keyAsUrl: string = key.join("-");
    return keyAsUrl;
};

function App() {
    const [board, setBoard] = useState<number[]>([]);
    const [myTile, setMyTile] = useState<number>(0);

    //Generate a board on start
    useEffect(() => {
        setBoard(boardKey(boardSize));
    }, []);

    //Create new board -> change url to new site?
    function genBoard() {
        //This should reload the page to the new board url site
        setBoard(boardKey(boardSize));
    }

    function pickTile() {
        //Ensure a board has been generated
        const rand = getRandomInt(0, (board.length-1));
        setMyTile(board[rand]);
    }

    return (
        <div className="bg-zinc-700 min-h-screen">
            <h1 className="font-test01 text-5xl text-center pt-4">
                Guess Who Game
            </h1>
            <br></br>
            <div className="flex mx-auto size-fit p-4 justify-center bg-red-300">
                <Tile pokeIndex={myTile} />
            </div>
            <div className="flex flex-row flex-wrap h-fit min-w-36 max-w-fit w-1/2 mx-auto justify-center p-2 gap-2 bg-red-200">
                <button
                    onClick={pickTile}
                    className="bg-blue-300 h-16 w-36 rounded-lg"
                >
                    Gen Tile
                </button>
                <button
                    onClick={genBoard}
                    className="bg-blue-300 h-16 w-36 rounded-lg"
                >
                    Gen new board
                </button>
            </div>
            <div className="flex flex-row flex-wrap max-w-screen-2xl mx-auto gap-4 p-4 justify-center bg-blue-100 bg-opacity-50">
                <Board board={board} />
            </div>
        </div>
    );
}

export default App;
