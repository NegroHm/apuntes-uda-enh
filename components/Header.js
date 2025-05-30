import React from 'react';
import styles from '../styles/Home.module.css'; // O el CSS que uses para el header

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTopBar}>
        Impulsado y creado por estudiantes
      </div>


    {/* Dividir */}



{/* DIV MAIN display grid 50 50 */}

    <div className={styles.headeMainGrid}>

      <div className={styles.headerLogoImg}>
        
      {/* parte de arriba */}
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


        
        </div>

    {/* <div className={styles.headerMenu}> */}
        
        <div className={styles.headerMain}>

  {/* Botón de subir apuntes a la izquierda */}
  <div className={styles.driveButton}>
    <a href="/subir-apuntes" className={styles.driveLink}>
      <img 
      src="/google-drive.png" // Asegúrate de que la ruta sea correcta
        alt="Google Drive"
        className={styles.driveIcon}
      />
      Subir mis apuntes
    </a>
  </div>

  {/* Menú de navegación */}
  <nav className={styles.navMenu}>
    <a href="/" className={styles.navLink}>Inicio</a>
    <a href="/informacion" className={styles.navLink}>Información</a>
    <a href="/contacto" className={styles.navLink}>Contacto</a>
  </nav>

  {/* Botón de cafecito */}
  <div className={styles.cafecitoButton}>
    <a href='https://cafecito.app/apuntesuda' rel='noopener' target='_blank'>
      <img
        srcSet='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x'
        src='https://cdn.cafecito.app/imgs/buttons/button_5.png'
        alt='Invitame un café en cafecito.app'
      />
    </a>
  </div>

</div>


        {/* </div> */}

    </div>
      
    </header>





  );
}
