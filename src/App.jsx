import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Plus, Grid3x3, List } from "lucide-react";
import ProductCard from "./components/ProductCard";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";
import { useDebounce } from "./hooks/useDebounce";
import productsData from "./data/products.json";

const ITEMS_PER_PAGE = 8;

function App() {
  const normalizedProducts = useMemo(() => {
    return (productsData || []).map((p, idx) => ({
      id: Number(p.id ?? idx + 1),
      name: p.name ?? "",
      category: p.category ?? "",
      description: p.description ?? "",
      price: Number(p.price ?? 0),
      stock: Number(p.stock ?? 0),
      createdAt: p.createdAt ?? new Date().toISOString(),
      isActive: p.isActive !== undefined ? Boolean(p.isActive) : true,
      tags: Array.isArray(p.tags) ? p.tags : [],
      ...p,
    }));
  }, [productsData]);

  const [products, setProducts] = useState(normalizedProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = ITEMS_PER_PAGE;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredProducts = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.name.toLowerCase().includes(term));
  }, [products, debouncedSearchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleAddProduct = useCallback(() => {
    setEditingProduct(null);
    setIsFormOpen(true);
  }, []);

  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  }, []);

  const handleSaveProduct = useCallback((productData) => {
    setProducts((prev) => {
      if (productData?.id) {
        return prev.map((p) =>
          p.id === productData.id
            ? {
                ...productData,
                price: Number(productData.price),
                stock: Number(productData.stock),
              }
            : p
        );
      } else {
        const maxId = prev.length ? Math.max(...prev.map((p) => p.id)) : 0;
        const newProduct = {
          ...productData,
          id: maxId + 1,
          price: Number(productData.price),
          stock: Number(productData.stock),
          createdAt: new Date().toISOString(),
          isActive: true,
          tags: [],
        };
        return [newProduct, ...prev];
      }
    });

    setIsFormOpen(false);
    setEditingProduct(null);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingProduct(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">
            Manage your product inventory efficiently
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                aria-label="Search products"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "card"
                      ? "bg-white text-blue-600 shadow"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Card view"
                  aria-label="Card view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="List view"
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                aria-label="Add product"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600" aria-live="polite">
            Showing {filteredProducts.length} of {products.length} products
            {debouncedSearchTerm !== searchTerm && searchTerm && (
              <span className="ml-2 text-gray-400">(searching...)</span>
            )}
          </div>
        </div>

        {currentProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <>
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProduct}
                  />
                ))}
              </div>
            ) : (
              <ProductTable
                products={currentProducts}
                onEdit={handleEditProduct}
              />
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
