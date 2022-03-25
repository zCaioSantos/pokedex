import { React } from "react";
import styles from "../styles/404.module.css";
import Head from 'next/head'

export default function notFound() {
    return (
        <section className={styles.container}>
            <Head>
                <title>Pokedex</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <a href="/">
                <img src="/img/psyduck.svg" alt="Imagem do pokemon: Psyduck" />
            </a>
            <hr />
            <article>
                <h1>404</h1>
                <p>Está pagina não existe</p>
            </article>
        </section>
    );
}
