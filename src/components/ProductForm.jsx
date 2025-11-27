import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function ProductForm({ product = null, onSave, onClose }) {
  // Keep form inputs as strings for controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);

  // Populate form when editing; reset when opening for new product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? "",
        price:
          product.price !== undefined && product.price !== null
            ? String(product.price)
            : "",
        category: product.category ?? "",
        stock:
          product.stock !== undefined && product.stock !== null
            ? String(product.stock)
            : "",
        description: product.description ?? "",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      });
    }
    setErrors({});
    // focus name input when form opens
    setTimeout(() => nameInputRef.current?.focus(), 0);
  }, [product]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    // Price: required, numeric, > 0
    if (formData.price === "") {
      newErrors.price = "Price is required";
    } else {
      const parsedPrice = parseFloat(formData.price);
      if (Number.isNaN(parsedPrice)) {
        newErrors.price = "Price must be a valid number";
      } else if (parsedPrice <= 0) {
        newErrors.price = "Price must be greater than 0";
      }
    }

    // Category
    if (!formData.category || !formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    // Stock: optional but if provided must be an integer >= 0
    if (formData.stock !== "") {
      const parsedStock = Number(formData.stock);
      if (!Number.isInteger(parsedStock) || Number.isNaN(parsedStock)) {
        newErrors.stock = "Stock must be a whole number";
      } else if (parsedStock < 0) {
        newErrors.stock = "Stock cannot be negative";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Coerce numeric fields
    const parsedPrice = parseFloat(formData.price);
    const parsedStock =
      formData.stock === "" ? 0 : parseInt(formData.stock, 10);

    const productData = {
      // if editing, keep original fields (including id)
      ...(product ?? {}),
      name: formData.name.trim(),
      price: parsedPrice,
      category: formData.category.trim(),
      stock: parsedStock,
      description: formData.description.trim(),
    };

    onSave && onSave(productData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For numeric inputs, allow empty string and basic cleaning
    // but keep as string in state to preserve controlled input behavior
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error for this field as soon as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2
            id="product-form-title"
            className="text-2xl font-bold text-gray-800"
          >
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close form"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          {/* Product Name */}
          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="product-name"
              ref={nameInputRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
              autoComplete="off"
            />
            {errors.name && (
              <p
                id="error-name"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="product-price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="product-price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? "error-price" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter price"
              min="0.01"
              step="0.01"
            />
            {errors.price && (
              <p
                id="error-price"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.price}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="product-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="product-category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? "error-category" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter category"
            />
            {errors.category && (
              <p
                id="error-category"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.category}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="product-stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              id="product-stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              aria-invalid={!!errors.stock}
              aria-describedby={errors.stock ? "error-stock" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.stock ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter stock quantity (optional)"
              min="0"
              step="1"
            />
            {errors.stock && (
              <p
                id="error-stock"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.stock}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="product-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="product-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
