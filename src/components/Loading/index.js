import { React } from "react";
import styles from "./loading.module.css";
import { MdCatchingPokemon } from "react-icons/md";

function Loading(props) {
    return (
        <div className={styles.loading__carregando}>
            <p><MdCatchingPokemon size={100} /></p>
        </div>
    );
}

export default Loading;
