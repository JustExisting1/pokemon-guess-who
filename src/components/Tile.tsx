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

const Tile: React.FC<{ pokeIndex: number }> = ({ pokeIndex }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    // const [pokemon, setPokemon] = useState(errorPokemon);
    const [tileName, setTileName] = useState("Loading");
    const [imgUrl, setImgUrl] = useState("Test");
    const [mainType, setMainType] = useState("Main Type");
    const [subType, setSubType] = useState("null");

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    // useEffect(() => {
    //     getPokemon(pokeIndex).then((data) => setPokemon(data));
    //     setTileName(pokemon.name);
    //     setImgUrl(pokemon.sprites.front_default);
    //     setMainType(pokemon.types[0].type.name);
    //     if (pokemon.types[1] !== undefined) {
    //         setSubType(pokemon.types[1].type.name);
    //     }else{
    //         setSubType("null")
    //     }
    // }, [pokemon, pokeIndex]);
    const poke = usePokemonAsync(pokeIndex);

    useEffect(() => {
        setIsFlipped(false);
        setTileName(poke.name);
        setImgUrl(poke.sprites.front_default);
        setMainType(poke.types[0].type.name);
        if (poke.types[1] !== undefined) {
            setSubType(poke.types[1].type.name);
        } else {
            setSubType("null");
        }
    }, [poke]);

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
            <div className="absolute truncate container [backface-visibility:hidden]">
                <img src={imgUrl} className="w-full rounded-t-lg" />
                <div className="w-32 h-[50px] text-center text-ellipsis overflow-clip bg-light rounded-b-lg">
                    <label className="text-dark-xd">{tileName}</label>
                    <div className="flex flex-row space-x-2 overflow-clip justify-center">
                        <TypeLable type={mainType} />
                        {/* Make this conditional */}
                        <TypeLable type={subType} />
                    </div>
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
