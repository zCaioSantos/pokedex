import { React } from "react";
import axios from "axios";
import styles from "../../styles/pokemon.module.css";
import Head from "next/head";
import { AiFillStar } from "react-icons/ai";

export default function pokemon({ pokemon }) {
    return (
        <section className={styles.container}>
            <Head>
                <title>Pokedex</title>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            <article className={styles.pokemon__info}>
                <p>ID: {pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}</p>
                <figure>
                    <img src={pokemon.fotos.front_default} alt={`Imagem do ${pokemon.nome}`} />
                </figure>
                <h1>{pokemon.nome}</h1>
                <ul className={styles.pokemon__info__tipos}>
                    {pokemon.tipos.map((item) => (
                        <li key={item} className={`${styles[item]}`}>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
                {pokemon.mitico && (
                    <AiFillStar color="#e2a6ff" size={30}/>
                )}
                {pokemon.lendario && (
                    <AiFillStar color="#FDFFA6" size={30}/>
                )}
            </article>

            <article className={styles.pokemon__status}>
                <h1>Status Base</h1>
                {pokemon.baseStatus.map((item) => (
                    <div className={styles.status__bar}>
                        <div className={`${styles.status__bar__fill} ${styles[item.stat.name]}`} style={{width: `${item.base_stat}%`}}>{`${item.stat.name}: ${item.base_stat}`}</div>
                    </div>
                ))}
            </article>
        </section>
    );
}


export async function getServerSideProps(context) {
    const id = context.params.id;
    const result = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.data);
    const result2 = await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then((res) => res.data);

    const pokemon = {
        id: result.id,
        nome: result.name,
        tipos: result.types.map((typeInfo) => typeInfo.type.name),
        fotos: result.sprites.other.dream_world,
        lendario: result2.is_legendary,
        mitico: result2.is_mythical,
        eggsGroups: result2.egg_groups.map((eggsInfo) => eggsInfo.name),
        baseStatus: result.stats,
        habilidades: result.abilities.map(
            (abilitiesInfo) => abilitiesInfo.ability.name
        ),
    };

    return {
        props: {
            pokemon: pokemon,
        },
    };
}
