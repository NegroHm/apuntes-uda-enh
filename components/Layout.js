// components/Layout.js

import Header from './Header'; // Asumiendo que tu header está en components/Header.js
import Footer from './Footer'; // Asumiendo que tu footer está en components/Footer.js

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children} {/* Aquí se mostrará el contenido de cada página */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;