import React from 'react';
import styles from '../styles/Home.module.css'; // O el CSS que uses para el header

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTopBar}>
        Impulsado y creado por estudiantes
      </div>

      <div className={styles.headerMain}>
        <div className={styles.logoSection}>
          <img
            src="/logo.png"
            alt="Apuntes UDA logo"
            className={styles.logoImage}
          />
          <div className={styles.logoText}>
            <h1>
              APUNTES <span className={styles.logoHighlight}>UDA</span>
            </h1>
            <p>Por y para los estudiantes</p>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <a href="/" className={styles.navLink}>Inicio</a>
          {/* Definir page infor */}
          <a href="/informacion" className={styles.navLink}>Información</a>
          {/* Definit page contacto */}
          <a href="/contacto" className={styles.navLink}>Contacto</a>
        </nav>

        <div className={styles.coffeeSection}>
          <div className={styles.coffeeIcon}>
            <img src="cafe.png" alt="Café" />
          </div>
          <div className={styles.coffeeText}>
            <p>Invitanos un cafe</p>
            <button className={styles.coffeeButton}>Donar un cafecito</button>
          </div>
        </div>
      </div>
    </header>





  );
}
