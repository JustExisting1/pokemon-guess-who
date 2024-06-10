import "./App.css";
import Board from "./components/Board";

// function Tiles() {
//     const tileItems = list.map((x) => <Tile name={x.name} src={x.image} />);
//     return tileItems;
// }

//Call backend for x amount of pokemon
//generate the board string for the pokemon ints
//load in x amount of pokemon names name images
//cache images somewhere?
//Temp Gen

// async function Board() {
//     const table = await createTable(tileCount); //Array of objects
//     const tiles:JSX.Element[] = []; //Array to store Tiles
//     table.map((i) => {
//         tiles.push(<Tile name={i.name} image={i.sprites.front_default} />);
//         });
//     return tiles;
// }

function App() {
    return (
        <div className="bg-zinc-700 min-h-screen">
            <h1 className="font-test01 text-5xl text-center pt-4">Guess Who Game</h1>
            <br></br>

            <div className="flex flex-row flex-wrap max-w-screen-2xl mx-auto gap-4 p-4 justify-center bg-blue-100 bg-opacity-50">
                <Board boardSize={5}/>
            </div>
        </div>
    );
}

export default App;
