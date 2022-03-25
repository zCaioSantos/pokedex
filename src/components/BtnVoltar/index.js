import { React } from "react";
import styles from "./btnVoltar.module.css";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

function BtnVoltar(props) {
    return (
        <Link href="/">
            {/* <a className={styles.btnVoltar}><FiChevronLeft /></a> */}
        </Link>
    );
}

export default BtnVoltar;
