import Aside from "../../components/aside/Aside";

export default function Dashboard() {
  

  return (
    <div className="min-h-screen bg-gray-100 md:flex">

      <Aside/>
      

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
