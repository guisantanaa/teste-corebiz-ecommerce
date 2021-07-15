import { MdEmail, MdHeadsetMic } from 'react-icons/md';
import styles from './styles.module.scss';
import Corebiz from '../../assets/corebiz.svg';
import Vtex from '../../assets/vtex.svg';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <section className={styles.cardInfo}>
          <h2>Localização</h2>
          <hr></hr>
          <p>Avenida Andrômeda, 2000. Bloco 6 e 8</p>
          <p>Alphavile SP</p>
          <p>brasil@corebiz.ag</p>
          <p>+55 11 3090 1039</p>
        </section>

        <section className={styles.button}>
          <button>
            <MdEmail size={18} />
            ENTRE EM CONTATO
          </button>
          <button>
            <MdHeadsetMic size={18} />
            FALE COM O NOSSO CONSULTOR ONLINE
          </button>
        </section>

        <section className={styles.logo}>
          <div className={styles.information}>
            <img src={Corebiz} alt="logo corebiz" />
          </div>

          <div className={styles.information2}>
            <img src={Vtex} alt="logo vtex" />
          </div>
        </section>
      </footer>
    </>
  );
}
