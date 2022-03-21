import { React } from "react";
import axios from "axios";
import styles from "../../styles/pokemon.module.css";

export default function pokemon({ pokemon }) {
    return (
        <section className={styles.container}>
            <article className={styles.pokemon}>
                <h3>ID: {pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}</h3>
                <figure>
                    <img src={pokemon.fotos.front_default} alt={`Foto do pokemon: ${pokemon.nome}`} />
                </figure>
                <section>
                    <h1>{pokemon.nome}</h1>
                    <p>{pokemon.tipos.join(" | ")}</p>
                </section>
            </article>
            <article>
                <section className={styles.info__pokemon}>
                    <h2>Detalhes</h2>
                    <article className={styles.len}>
                        {pokemon.lendario && <p style={{color: "#FFE600"}}>Lendário</p>}
                        {pokemon.mitico && <p style={{color: "#B18CFF"}}>Mítico</p>}
                    </article>
                    <article className={styles.habiidades}>
                        <h3>Habilidades</h3>
                        <p>
                            <p>{pokemon.habilidades.join(" | ")}</p>
                        </p>
                    </article>
                    <article className={styles.status}>
                        <h3>Status</h3>
                        <p>
                            <p>{pokemon.baseStatus.join(" | ")}</p>
                        </p>
                    </article>        
                        {pokemon.eggsGroups && (
                            <article className={styles.egggroup}>
                                <h3>Eggs-Groups</h3>
                                <p>{pokemon.eggsGroups.join(" | ")}</p>
                            </article>
                        )}
                </section>
            </article>
        </section>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => res.data);
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
        baseStatus: result.stats.map((baseStatus) => baseStatus.base_stat),
        habilidades: result.abilities.map((abilitiesInfo) => abilitiesInfo.ability.name),
    };

    return {
        props: {
            pokemon: pokemon,
        },
    };
}
