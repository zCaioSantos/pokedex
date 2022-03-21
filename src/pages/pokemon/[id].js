import { React } from "react";
import axios from "axios";

export default function Home({ pokemon }) {
    return (
        <div>

            <img src={pokemon.fotos.front_default} alt={`Foto do pokemon: ${pokemon.nome}`} />
            <h1>{pokemon.nome}</h1>
            <p>{pokemon.tipos.join(" | ")}</p>
            <p>{pokemon.eggsGroups.join(" | ")}</p>
            <p>Lendario: {pokemon.lendario ? "Sim" : "Não"}</p>
            <p>Mitico: {pokemon.mitico ? "Sim" : "Não"}</p>
            <p>{pokemon.baseStatus.join(" | ")}</p>
            <p>{pokemon.habilidades.join(" | ")}</p>
            
        </div>
    );
};

export async function getServerSideProps(context) {
    const id = context.params.id;
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => res.data);
    const result2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then((res) => res.data);
    
    const pokemon = {
        id: result.id,
        nome: result.name,
        tipos: result.types.map(typeInfo => typeInfo.type.name),
        fotos: result.sprites.other.dream_world,
        lendario: result2.is_legendary,
        mitico: result2.is_mythical,
        eggsGroups: result2.egg_groups.map(eggsInfo => eggsInfo.name),
        baseStatus: result.stats.map(baseStatus => baseStatus.base_stat),
        habilidades: result.abilities.map(abilitiesInfo => abilitiesInfo.ability.name),
    };

    return {
        props: {
            pokemon: pokemon,
        },
    };
}
