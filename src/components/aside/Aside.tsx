import { useUser } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { FaUser, FaChartLine, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Aside = () => {
    const { logout } = useUser(); 
    const { goTo } = useCustomNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Cerraste Sesión');
        goTo('/');
    };

    return (
        <aside className="bg-orange-400 md:w-64 p-6 w-full z-10">
            <h2 className="text-white text-3xl font-bold mb-8 text-center">Admin Panel</h2>
            <nav>
                <ul className='sm:flex sm:justify-between md:block'>
                    <li className="mb-5">
                        <a href="/admin" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <FaChartLine className="mr-2" />
                            Dashboard
                        </a>
                    </li>
                    <li className="mb-5">
                        <a href="/admin/users" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <FaUser className="mr-2" />
                            Usuarios
                        </a>
                    </li>
                    <li className="mb-5">
                        <a href="/admin/products" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                            <FaShoppingCart className="mr-2" />
                            Productos
                        </a>
                    </li>
                    <li>
                        <button className="flex items-center text-white hover:text-gray-200 transition duration-300" onClick={handleLogout}>
                            <FaSignOutAlt className="mr-2" />
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Aside;
