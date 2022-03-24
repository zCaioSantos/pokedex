import { React, useState } from "react";
import CardPokemon from "../components/CardPokemon";
import styles from "../styles/Home.module.css";
import { HiSearch } from "react-icons/hi";
import axios from "axios";
import Head from 'next/head'

export default function Home({ pokemon }) {

    const [busca, setBusca] = useState("");

    return (
        <div className={styles.container}>
            <Head>
                <title>Pokedex</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <section className={styles.header}>
                <img src="./img/logoPokedex.png" width={150} alt="Logo Pokedex" />
                <h1>Welcome to <span>Pokedex</span></h1>
                <div className={styles.input__busca}>
                    <input type="text" placeholder="What is this pokémon?" value={busca} onChange={(evt) => {setBusca(evt.target.value)}} />
                    <i><HiSearch size="1.5em" color="757575" /></i>
                </div>
            </section>
            <ul>
                {pokemon.filter((value) => {
                    if (busca === "") {
                        return value
                    } else if (value.nome.includes(busca.toLocaleLowerCase())) {
                        return value
                    }
                }).map((pokemon) => (
                    <li key={pokemon.id}>
                        <a href={`/pokemon/${pokemon.id}`}>
                            <CardPokemon nome={pokemon.nome} foto={pokemon.fotos.front_default} tipos={pokemon.tipos} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps(context) {
    let listPokemons = [];

    for (let i = 1; i <= 151; i++) {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((res) => res.data);
        const pokemon = {
            id: result.id,
            nome: result.name,
            tipos: result.types.map(typeInfo => typeInfo.type.name),
            fotos: result.sprites.other.dream_world,
        };
        listPokemons.push(pokemon);
    }

    return {
        props: {
            pokemon: listPokemons,
        },
    };
}
