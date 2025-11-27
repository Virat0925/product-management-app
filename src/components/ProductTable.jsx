import React from "react";
import { Edit2 } from "lucide-react";

function ProductTable({ products = [], onEdit = () => {} }) {
  return (
    <div
      className="overflow-x-auto bg-white rounded-lg shadow"
      role="region"
      aria-label="Product list table"
    >
      <table className="min-w-full divide-y divide-gray-200" role="table">
        <caption className="sr-only">Products</caption>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => {
            const {
              id = "",
              name = "Untitled",
              price = 0,
              category = "-",
              stock = 0,
              description = "",
            } = product || {};

            const formattedPrice = `₹${Number(price).toLocaleString("en-IN")}`;

            return (
              <tr key={id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formattedPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      stock > 10
                        ? "bg-green-100 text-green-800"
                        : stock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded-md"
                    title={`Edit ${name}`}
                    aria-label={`Edit ${name}`}
                  >
                    <Edit2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(ProductTable);
