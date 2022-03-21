import { React } from "react";
import styles from "../styles/404.module.css";

export default function notFound() {
    return (
        <section className={styles.container}>
            <a href="/">
                <img src="./img/psyduck.svg" alt="Imagem do pokemon: Psyduck" />
            </a>
            <hr />
            <article>
                <h1>404</h1>
                <p>Está pagina não existe</p>
            </article>
        </section>
    );
}
