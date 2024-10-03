import { useUser } from '../../context/AuthContext';
import { FaUser, FaChartLine, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useCustomNavigate from '../../hooks/useCustomNavigate';

export default function Dashboard() {
  
  const {logout, user} = useUser();
  const {goTo} = useCustomNavigate();

  console.log(user); // Verifica que user.role sea 'admin'

  const handleLogout = () => {
    logout();
    toast.success('Cerraste Sesión');
    goTo('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 md:flex">

      <aside className="bg-orange-400 md:w-64 p-6 shadow-lg w-full">
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

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold">Usuarios</h2>
            <p className="text-4xl font-bold">1,024</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold">Productos</h2>
            <p className="text-4xl font-bold">756</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold">Ventas</h2>
            <p className="text-4xl font-bold">128</p>
          </div>
        </div>
      </main>
    </div>
  );
}
