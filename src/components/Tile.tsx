import { useEffect, useState } from "react";
// import getPokemon, { errorPokemon } from "../api/getPokeName";
import pokeball from "/pokeball.png";
import usePokemonAsync from "../api/getPokeName";

const backImage = pokeball;

const typeColour: { [type: string]: string } = {
    normal: "bg-[#AAAB98]",
    fire: "bg-[#FE4423]",
    water: "bg-[#3299FE]",
    electric: "bg-[#FECC32]",
    grass: "bg-[#76CD55]",
    ice: "bg-[#66CDFE]",
    fighting: "bg-[#BB5445]",
    poison: "bg-[#AA5599]",
    ground: "bg-[#DCBB54]",
    flying: "bg-[#8999FE]",
    psychic: "bg-[#FF5498]",
    bug: "bg-[#ABBA22]",
    rock: "bg-[#BAAA67]",
    ghost: "bg-[#6767BB]",
    dragon: "bg-[#7766EE]",
    dark: "bg-[#765545]",
    steel: "bg-[#AAAABB]",
    fairy: "bg-[#EF99EF]",
};

const TypeLable: React.FC<{ type: string }> = ({ type }) => {
    if (type == "null") {
        return null;
    }

    return (
        <label className={`${typeColour[type]} px-1 rounded-lg text-dark-xd`}>
            {type}
        </label>
    );
};

const numerNums = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"];

const Tile: React.FC<{ pokeIndex: number }> = ({ pokeIndex }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    // const [pokemon, setPokemon] = useState(errorPokemon);
    // const [tileName, setTileName] = useState("Loading");
    // const [imgUrl, setImgUrl] = useState("Test");
    // const [mainType, setMainType] = useState("Main Type");
    // const [subType, setSubType] = useState("null");
    // const [gen, setGen] = useState("Gen");  //parse into number
    // const [legendary, setLegendary] = useState(Boolean)
    // const [mythical, setMythical] = useState(Boolean)

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const poke = usePokemonAsync(pokeIndex);
    const imgUrl = poke.sprites.front_default;
    const tileName = poke.name;
    const mainType = poke.types[0].type.name;
    const subType = () => {
        if (poke.types[1] !== undefined) {
            return poke.types[1].type.name;
        } else {
            return "null";
        }
    };
    const gen = () => {
        const numeral = poke.species.generation.name.split("-").pop();
        return numerNums.findIndex((e) => e === numeral) + 1;
        //sort gen
    };
    const isLegendary = poke.species.is_legendary;
    const isMythical = poke.species.is_mythical;
    const shimmer = () => {
        if (isLegendary || isMythical) {
            return "bg-yellow-300";
        }
        return null;
    };
    const shimmerPadding = () => {
        if (isLegendary || isMythical) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        setIsFlipped(false);
    }, [pokeIndex]);

    return (
        <div
            onClick={handleClick}
            className={
                `flex h-[178px] w-32 items-center justify-center
                [transform-style:preserve-3d] overflow-visible transition-transform duration-500
             bg-light-xl rounded-lg ring-2 ring-offset-2 ring-offset-accent-xd ring-accent active:ring-offset-accent
              hover:ring-accent-xl hover:ring-4 ` +
                (isFlipped
                    ? "[transform:rotateY(180deg)]"
                    : "[transform:rotateY(0deg)]")
            }
        >
            {/* Front */}
            <div className="absolute w-full h-full truncate container bg-light rounded-lg [backface-visibility:hidden]">
                <div className="w-32 h-[50px] text-center text-ellipsis overflow-clip">
                    <label className="text-dark-xd px-1">{tileName}</label>
                    <div className="flex flex-row space-x-2 overflow-clip justify-center">
                        <TypeLable type={mainType} />
                        <TypeLable type={subType()} />
                    </div>
                </div>
                {/* Change the colour depending on legendary/mythic/not */}
                <div
                    className={`w-10/12 mx-auto p-${shimmerPadding()} rounded-lg ${shimmer()}`}
                >
                    <img
                        src={imgUrl}
                        className="w-full mx-auto rounded-lg bg-light-xl shadow-red-400"
                    />
                </div>
                <div className="w-full h-fit object-bottom text-center">
                    <label>Gen: {gen()}</label>
                </div>
            </div>
            {/* Back */}
            <div className="relative rounded-lg bg-light content-center h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <img src={backImage} className="w-full rounded-t-lg" />
            </div>
        </div>
    );
};

export default Tile;
