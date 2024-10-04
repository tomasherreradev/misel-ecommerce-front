import React from 'react';
import { Product } from '../../types/index';
import imageExample from './../../assets/images/mila-pollo.jpg'

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-4 m-2">
                <img
                    src={imageExample}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
                />

            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description || 'No description available'}</p>
            <p className="text-lg font-semibold">Precio: ${product.price}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>
            <button className="mt-4 bg-orange-500 text-white rounded-md px-4 py-2 hover:bg-orange-600">
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductCard;
