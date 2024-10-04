import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>(""); // Puede ser un string vacío o un número
  const [stock, setStock] = useState<number | string>(""); // Puede ser un string vacío o un número
  const [category, setCategory] = useState<"pollo" | "pescado">("pollo");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !price || !category || !image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch(`${import.meta.env.VITE_MISEL_BACK_API_URL}/products/add`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al añadir el producto");
        return;
      }

      const data = await response.json();
      toast.success(`Producto añadido con éxito. ID: ${data.productId}`);
      // Reiniciar el formulario
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al añadir el producto");
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

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 p-6 rounded max-w-[600px] mx-auto my-12">
      <h2 className="text-2xl font-bold mb-4">Añadir Producto</h2>
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
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Añadir Producto
      </button>
    </form>
  );
};

export default AddProduct;
