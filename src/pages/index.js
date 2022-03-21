import { React, useState } from "react";
import CardPokemon from "../components/CardPokemon";
import styles from "../styles/Home.module.css";
import { HiSearch } from "react-icons/hi";

export default function Home({ pokemon }) {

    const [busca, setBusca] = useState("");

    return (
        <div className={styles.container}>
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
                    } else if (value.nome === busca.toLocaleLowerCase()) {
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

export async function getServerSideProps(context) {
    const result = await fetch("http://localhost:3000/api/getGeneration1");
    const pokemon = await result.json();

    return {
        props: {
            pokemon: pokemon,
        },
    };
}
