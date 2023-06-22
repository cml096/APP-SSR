import Link from "next/link";

const Navbar = () => {
    return (
        <div>
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