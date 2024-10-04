import { useEffect, useState } from "react"
import type { Product } from "../types";
import ProductCard from "../components/card/CardProducts";
import { toast } from "react-toastify";


export default function Home() {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const response = await fetch(`${import.meta.env.VITE_MISEL_BACK_API_URL}/products/get-all`);
    if (!response.ok) {
      toast.error(`Error: No se pudieron obtener los datos`)
      return;
    }

    setProducts(await response.json());
  }



  return (
    <div className="bg-gray-200 p-2 md:p-12">
      <div className="container mx-auto">
        <div className="flex justify-between gap-4">
          <h1 className="text-3xl font-bold bg-orange-500 p-4 text-white">Nuestros Productos</h1>
          <div className="flex justify-center items-center">
            <button className="text-xl bg-white rounded-xl py-2 px-4">Filtrar</button>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>


      </div>
    </div>
  )
}
