import { Edit2, Package } from "lucide-react";

export default function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-48 flex items-center justify-center">
        <Package className="w-20 h-20 text-blue-400" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <button
            onClick={() => onEdit(product)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit product"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 min-h-[40px]">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              product.stock > 10
                ? "bg-green-100 text-green-700"
                : product.stock > 0
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            Stock: {product.stock}
          </span>
        </div>
      </div>
    </div>
  );
}
