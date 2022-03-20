import { React } from "react";
import CardPokemon from "../components/CardPokemon";
import styles from "../styles/Home.module.css";
import { HiSearch } from "react-icons/hi";

export default function Home({ pokemon }) {
    return (
        <div className={styles.container}>
            <section className={styles.header}>
                <img src="./img/logoPokedex.png" width={150} alt="Logo Pokedex" />
                <h1>Welcome to <span>Pokedex</span></h1>
                <form>
                    <input type="text" placeholder="What is this pokémon?" />
                    <button type="submit"><HiSearch size="1.5em" color="757575" /></button>
                </form>
            </section>
            <ul>
                {pokemon.map((pokemon) => (
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
