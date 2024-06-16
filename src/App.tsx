import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import getRandomInt from "./utils/randomInt";
import Tile from "./components/Tile";
import gitIcon from "./assets/github-mark.svg";
import gitIconW from "./assets/github-mark-white.svg";
//Generate key for board
//Pick a random tile from the board key
//generate the passing in the board key

const maxRange = 1025;
const boardSize = 20;

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
        setMyTile(1);
    }, []);

    //Create new board -> change url to new site?
    function genBoard() {
        //This should reload the page to the new board url site
        setBoard(boardKey(boardSize));
        //pick a tile from the board 
    }

    function pickTile() {
        //Ensure a board has been generated
        const rand = getRandomInt(0, board.length - 1);
        setMyTile(board[rand]);
    }

    function copyURL() {
        if (!navigator.clipboard) {
            alert(
                "Clipboard API not supported. Please manually copy the url to share this board."
            );
        }
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch((err) => {
                alert(
                    "Could not copy url. Please manually copy the url to share this board."
                );
                console.log(err);
            });
    }

    return (
        <div className="bg-dark-d min-h-screen">
            <div className="bg-dark-xd h-fit pt-2 pb-2">
                <h1 className="font-display text-7xl text-center text-accent">
                    Guess Who Game
                </h1>
                <h2 className="font-display text-4xl text-center text-accent">
                    Pokemon Edition
                </h2>
            </div>
            <br />
            <div className="flex mx-auto size-fit p-4 justify-center">
                <Tile pokeIndex={myTile} />
            </div>
            <div className="flex flex-row flex-wrap h-fit min-w-36 max-w-fit w-1/2 mx-auto justify-center p-2 gap-2">
                <button
                    onClick={pickTile}
                    className="bg-accent text-light-xl text-xl hover:bg-accent-d active:bg-accent-xd h-16 w-36 rounded-lg"
                >
                    Gen Tile
                </button>
                <button
                    onClick={copyURL}
                    className="bg-accent text-light-xl text-xl hover:bg-accent-d active:bg-accent-xd h-16 w-36 rounded-lg"
                >
                    Share Board
                </button>
                <button
                    onClick={genBoard}
                    className="bg-accent text-light-xl text-xl hover:bg-accent-d active:bg-accent-xd h-16 w-36 rounded-lg"
                >
                    Gen new board
                </button>
            </div>
            <div className="flex flex-row flex-wrap min-w-fit max-w-screen-2xl w-1/2 mx-auto gap-4 p-4 justify-center bg-dark">
                <Board board={board} />
            </div>
            <br />
            <div className="w-full h-auto flex justify-center p-2">
                <a
                    className="group"
                    href="https://github.com/JustExisting1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img className="size-8 mx-auto" src={gitIconW} />
                    <p className="text-center text-sm text-primary-xl group-hover:underline">
                        By JustExisting1
                    </p>
                </a>
            </div>
        </div>
    );
}

export default App;
