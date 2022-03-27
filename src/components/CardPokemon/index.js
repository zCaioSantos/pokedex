import { React } from "react";
import styles from "./cardPokemon.module.css";

export default function CardPokemon(props) {
    return (
        <div title={`Card do Pokemon: ${props.nome}. Clique para ver detalhes!`} className={`${styles.card__pokemon} ${styles[props.tipos[0]]}`}>
            <figcaption>
                <img src={props.foto} alt={`Imagem do pokemon ${props.nome}`} />
            </figcaption>
            <section>
                <h1>{props.nome}</h1>
                <p>{props.tipos.join(" | ")}</p>
            </section>
        </div>
    );
}
