import React from 'react';
import styles from '../styles/Home.module.css'; // importa el CSS

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <img
          src="/logo.png"
          alt="Apuntes UDA logo"
          className={styles.footerLogo}
        />
        <p className={styles.footerText}>
          Esto fue desarrollado para tener un mejor orden a la hora de estudiar, tener todo los apuntes concentrados en un sitio web.<br />
          Esto crece y es mantenido por estudiante.
        </p>
      </div>

      <div className={styles.footerBottom}>
        <p>Todos los derechos reservados @apuntesuda.com</p>
      </div>
    </footer>
  );
}
