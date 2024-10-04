import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { toast } from "react-toastify";
import Aside from "../../components/aside/Aside"; 

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_MISEL_BACK_API_URL}/products/get-all`);
    if (!response.ok) {
      toast.error("Error al obtener los productos");
      return;
    }

    const data = await response.json();
    setProducts(data);
  };

  // Calcular los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calcular el total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);
  return (
    <div className="bg-gray-200 flex">
      <Aside />
      <div className="flex-1 ml-4 p-4"> 
        <div className="w-full flex justify-between items-center py-10 md:px-4">
            <h1 className="text-3xl font-bold mb-4">Gestión de Productos</h1>
            <a href="/admin/products/add" className="mb-4 bg-blue-500 text-white p-2 rounded">Agregar Producto</a>
        </div>
        
        <ul className="space-y-4">
          {currentProducts.map(product => (
            <li key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:justify-between">
              <div className="flex md:flex-row md:items-center">
                {product.image_url && (
                  <img src={`${import.meta.env.VITE_MISEL_BACK_API_URL}/uploads/${product.image_url}`} alt={product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                )}
                <div>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  {product.description && <p className="text-gray-600">{product.description}</p>}
                  <p className="mt-2">Precio: ${product.price}</p>
                  {product.stock !== undefined && <p>Stock: {product.stock}</p>}
                  <p>Categoría: {product.category}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:self-center">
                <a href={`/admin/products/edit/${product.id}`} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Editar</a>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
