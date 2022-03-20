import { React } from "react";
import CardPokemon from "../components/CardPokemon";
import styles from "../styles/Home.module.css";

export default function Home({ pokemon }) {
    return (
        <div className={styles.container}>
            <section className={styles.header}>
                <img src="./img/logoPokedex.png" width={150} alt="Logo Pokedex" />
                <h1>Welcome to <span>Pokedex</span></h1>
                <form>
                    <input type="text" placeholder="Informe o nome do pokemon" />
                </form>
            </section>
            <ul>
                {pokemon.map((pokemon) => (
                    <li key={pokemon.id}>
                        <a href="#">
                            <CardPokemon nome={pokemon.nome} foto={pokemon.fotos.front_default} />
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
