import Link from "next/link";
import styles from './styles.module.css'

const Navbar = ({className}) => {
  return (
    <nav className={`${className} ${styles.nav}`}>
      <Link href={"/"}>HOME</Link>
      <Link href={"/about"}>ABOUT</Link> 
      <Link href={"/contact"}>CONTACT</Link>
    </nav>
  );
};

export default Navbar;
