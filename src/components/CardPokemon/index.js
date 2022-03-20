import { React } from "react";
import styles from "./cardPokemon.module.css"

export default function CardPokemon(props) {
    return (
        <div className={styles.card__pokemon}>
            <figcaption>
                <img src={props.foto} alt={`Imagem do pokemon ${props.nome}`} />
            </figcaption>
            <h1>{props.nome}</h1>
        </div>
    );
}
