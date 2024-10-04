import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { Product } from "../../../types";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>(); // Recuperar el ID del producto
  const [product, setProduct] = useState<Product | null>(null); // Usar la interface Product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>(""); // Se permite un valor vacío
  const [stock, setStock] = useState<number | string>(""); // Se permite un valor vacío
  const [category, setCategory] = useState<"pollo" | "pescado">("pollo");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_MISEL_BACK_API_URL}/products/${id}`);
          if (!response.ok) {
            throw new Error("Error al obtener el producto");
          }
          const data: Product[] = await response.json();  // Asegúrate de que sea un array de Product
          if (data.length === 0) {
            throw new Error("Producto no encontrado"); // Maneja el caso en que no se encuentra el producto
          }
          const productData = data[0]; // Accede al primer elemento del array
          setProduct(productData); // Establece el producto
          setName(productData.name);
          setDescription(productData.description || "");
          setPrice(String(productData.price)); 
          setStock(String(productData.stock)); 
          setCategory(productData.category);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Error al obtener el producto");
        }
      };
      

    fetchProduct();
  }, [id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar que los campos requeridos no estén vacíos
    if (!name || !price || !category) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_MISEL_BACK_API_URL}/products/edit/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al editar el producto");
        return;
      }

      const data = await response.json();
      toast.success(`Producto editado con éxito. ID: ${data.productId}`);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al editar el producto");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("pollo");
    setImage(null);
  };

  if (!product) {
    return <div>Cargando...</div>; 
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 p-6 rounded max-w-[600px] mx-auto my-12">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full py-2 px-3"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="border rounded w-full py-2 px-3"
          step="0.01"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border rounded w-full py-2 px-3"
          min={0}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Categoría:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as "pollo" | "pescado")}
          required
          className="border rounded w-full py-2 px-3"
        >
          <option value="pollo">Pollo</option>
          <option value="pescado">Pescado</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Imagen:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border rounded w-full py-2 px-3"
        />
        {product.image_url && (
          <div className="mt-2">
            <img src={product.image_url} alt="Imagen actual" className="w-24 h-24 object-cover" />
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Editar Producto
      </button>
    </form>
  );
};

export default EditProduct;
