import { BiCart } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { MdPermIdentity } from 'react-icons/md';
import Logo from '../../assets/logo.svg';

import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img src={Logo} alt="logo corebiz" />
      </a>

      <form className={styles.form}>
        <input type="text" placeholder="O que está procurando ?" />
        <button type="button">
          <FiSearch size={15} />
        </button>
      </form>

      <a href="/" className={styles.account}>
        <MdPermIdentity width={10} />
        Minha conta
      </a>

      <a href="/">
        <BiCart size={30} />
      </a>
    </header>
  );
}
