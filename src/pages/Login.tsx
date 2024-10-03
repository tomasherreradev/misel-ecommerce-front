import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/AuthContext';  

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useUser();  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        toast.error(data.error || 'Error en el inicio de sesión');
        return;
      }

      toast.success('Inicio de sesión exitoso');

      login(data.token, data.user);  

      navigate('/');

    } catch (error) {
      toast.error('Error en el servidor');
    }
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[430px]">
        <h1 className="text-[40px] leading-10 font-black text-slate-600 mb-12 text-center">Inicia Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-600 text-sm font-bold mb-2">
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder='user@example.com'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-600 text-sm font-bold mb-2">
              Contraseña <span className='text-red-600'>*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder='983jkf0248'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <a href="/forgot-password" className="inline-block align-baseline text-left text-sm transition-colors text-white">
              ¿Olvidaste Tu Contraseña?
            </a>
            <button
              type="submit"
              className="bg-orange-500 text-white hover:bg-white border hover:text-orange-500 py-2 px-4 rounded transition-all"
            >
              Continuar
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/signup" className="inline-block align-baseline text-sm text-slate-600 transition-colors">
            Crear Nueva Cuenta
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
