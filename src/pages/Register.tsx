import { useState } from "react";
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', 
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
      toast.error("Rellena todos los campos.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
  
    const response = await fetch(`${import.meta.env.VITE_MISEL_BACK_API_URL}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      }),
    });
  
    if(!response.ok) {
      const data = await response.json()
      toast.error(data.message);
      return;
    }

    toast.success("Datos enviados, Revisa tu email.");

  };
  

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[430px]">
        <h1 className="text-[40px] leading-10 font-black text-slate-600 mb-12 text-center">Crear Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-slate-600 text-sm font-bold mb-2">
              Nombre <span className='text-red-600'>*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder='Tu Nombre'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-600 text-sm font-bold mb-2">
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder='user@example.com'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
              placeholder='*****'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-slate-600 text-sm font-bold mb-2">
              Repetir Contraseña <span className='text-red-600'>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='*****'
              className="appearance-none border rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-orange-500 text-white hover:bg-white hover:text-orange-500 py-2 px-4 rounded transition-all"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/login" className="inline-block align-baseline text-sm text-slate-600 transition-colors">
            Ya tengo una cuenta
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
