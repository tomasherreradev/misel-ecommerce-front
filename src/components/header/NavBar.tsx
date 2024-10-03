import { useState } from 'react';
import { useUser } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useUser();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
        toast.success('Cerraste sesión');
    };

    return (
        <section className="relative flex justify-between items-center p-4 container mx-auto">
            <a href="/" className="text-4xl font-bold">Misel</a>

            <nav className="absolute left-1/2 transform -translate-x-1/2 space-x-8 hidden lg:flex">
                <a href="/about" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg">Sobre Nosotros</a>
                <a href="/contact" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg">Contacto</a>
                <a href="/cart" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l1 9h12l1-9h2"
                        ></path>
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="16" cy="21" r="1"></circle>
                    </svg>
                </a>

                {user?.role === 'admin' && (
                    <a href="/admin" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg">
                        Dashboard
                    </a>
                )}
            </nav>

            <div className="flex items-center space-x-4">
                {user ? (
                    <div className="flex items-center gap-2">
                        <p>Bienvenido, <span className="font-bold">{user.name}</span></p>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 hidden md:block"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <p>Hola, <span className="font-bold">invitado</span></p>
                        <a href="/login" className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                            Iniciar Sesión
                        </a>
                    </div>
                )}

                <div className="lg:hidden flex">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menú en dispositivos móviles */}
            <div
                className={`fixed top-0 right-0 z-50 h-full bg-orange-500 text-white p-6 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-64 lg:hidden`}
            >
                <div className="w-full flex justify-end">
                    <button onClick={toggleMenu} className="mb-4 focus:outline-none">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col space-y-4">
                    <a href="/" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg" onClick={toggleMenu}>Home</a>
                    <a href="/about" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg" onClick={toggleMenu}>Sobre Nosotros</a>
                    <a href="/contact" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg" onClick={toggleMenu}>Contacto</a>
                    <a href="/cart" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg" onClick={toggleMenu}>Carrito</a>

                    {user?.role === 'admin' && (
                        <a href="/dashboard" className="hover:text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 px-3 py-2 rounded-lg" onClick={toggleMenu}>
                            Dashboard
                        </a>
                    )}

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <a href="/login" className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                            Iniciar Sesión
                        </a>
                    )}
                </nav>
            </div>
        </section>
    );
}
