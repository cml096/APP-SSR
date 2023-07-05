import Link from "next/link";
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <nav>
                <menu>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/about"}>About</Link>
                </menu>
            </nav>
        </div>
    );
}

export default Navbar;