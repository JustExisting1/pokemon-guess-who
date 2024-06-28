import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import getRandomInt from "./utils/randomInt";
import Tile from "./components/Tile";
// import gitIcon from "./assets/github-mark.svg";
import gitIconW from "./assets/github-mark-white.svg";
import { useNavigate, useSearchParams } from "react-router-dom";

const minRange = 1;
const maxRange = 1025;
const boardSize = 32;

//todo list
//encode + decode board url
/*Pokemon descs
*   evolves_from_species => null = base evo
*   evolves to?
* fully evloved?
* colour?
* habitat? X dont use this one
*/

const boardKey = (boardSize: number): number[] => {
    const key: number[] = [];
    for (let i = 0; i < boardSize; i++) {
        //check if it is in the array => if is in array, reroll and check again
        const rand = getRandomInt(minRange,maxRange);
        if(!key.includes(rand)){
            key.push(getRandomInt(minRange, maxRange));
        }else{
            i--;
        }
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
    const [board, setBoard] = useState<number[]>([1]);
    const [myTile, setMyTile] = useState<number>(1);

    //Create new board -> change url to new site?
    function genBoard() {
        //This should reload the page to the new board url site
        const boardUrl = keyToUrl(boardKey(boardSize));
        navigate(`/?board=${boardUrl}`);
        // setBoard(boardKey(boardSize));
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

    const [searchParamas] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        //Check if url contains valid board
        const query = searchParamas.get("board");
        const board = urlToKey(query);

        //Board is not valid, gen new link + board
        if (board.valid == false) {
            const boardUrl = keyToUrl(boardKey(boardSize));
            navigate(`/?board=${boardUrl}`);
            return;
        }

        //Board is valid, load it
        setBoard(board.board);
    }, [searchParamas, navigate]);

    //Pick new tile whenever board changes
    useEffect(() => {
        pickTile();
    }, [board]);

    //Checks that the url has a valid board, otherwise returns that board is invalid
    const urlToKey = (
        url: string | null
    ): { board: number[]; valid: boolean } => {
        //Check board query exits
        if (url != null) {
            //board query exists
            const stringBoard: string[] = url.split("-");
            const board: number[] = stringBoard.map((x) => {
                return Number(x);
            });
            //Check for Nan
            if (board.includes(NaN)) {
                //Not valid board
                console.log("Board contains NaN");
                return { board: [1], valid: false };
            }
            //Check that all numbers are within range
            const below = board.filter((x) => x < minRange);
            const above = board.filter((x) => x > maxRange);
            if (below.length > 0 || above.length > 0) {
                //Not valid board
                console.log("Out of range value");
                return { board: [1], valid: false };
            }
            //Check that board legnth is the same as board size
            if (board.length != boardSize) {
                //Not valid board
                console.log("Not enough tiles in board");
                return { board: [1], valid: false };
            }

            //Valid Board
            return { board: board, valid: true };
        }
        //No board in query
        console.log("No board in link");
        return { board: [1], valid: false };
    };

    //sanatise query,
    //if any error in the url, create a new board and set that as the url
    //if the url is valid, decrypt it
    //send the decrypted url to the board as a number[]

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
