import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-orange-500 py-4 lg:py-20">
      <div className="relative container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-sm mb-4 md:mb-0 md:w-full md:max-w-[237px]">
          <h2 className="text-4xl font-bold text-center md:text-left">Misel</h2>
          <div className="text-sm my-4 md:mb-0">
            &copy; {new Date().getFullYear()} Misel. Todos los derechos reservados.
          </div>
        </div>

        <nav className="grid grid-cols-2 md:flex md:flex-col gap-4">
          <a href="#home" className="text-lg hover:text-orange-700 transition duration-300">Home</a>
          <a href="#about" className="text-lg hover:text-orange-700 transition duration-300">Sobre Nosotros</a>
          <a href="#contact" className="text-lg hover:text-orange-700 transition duration-300">Contacto</a>
          <a href="/cart" className="text-lg hover:text-orange-700 transition duration-300">Carrito</a>
        </nav>


      </div>
    </footer>
  );
};

export default Footer;
