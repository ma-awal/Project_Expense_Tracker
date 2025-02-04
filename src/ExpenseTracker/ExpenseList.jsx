import React, { useState } from 'react';

function ExpenseList({ type, categories, transactions, onEdit, onDelete }) {
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter transactions based on type and category
  let filteredTransactions = transactions.filter((t) => t.type === type);

  if (categoryFilter) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.category === categoryFilter
    );
  }

  // Sort transactions based on price
  if (priceFilter === 'Sort: High to Low') {
    filteredTransactions = filteredTransactions.sort(
      (a, b) => b.amount - a.amount
    );
  } else if (priceFilter === 'Sort: Low to High') {
    filteredTransactions = filteredTransactions.sort(
      (a, b) => a.amount - b.amount
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{type}</h3>
        <div className="flex space-x-2">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">Sort by Price</option>
            <option value="Sort: High to Low">Sort: High to Low</option>
            <option value="Sort: Low to High">Sort: Low to High</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">Filter by Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="border rounded-lg p-4 bg-gray-50 h-64 overflow-y-auto space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-lg font-semibold text-center capitalize">
            No transactions available.
          </p>
        ) : (
          filteredTransactions.map((transaction) => {
            const { category, amount, date, id } = transaction;
            return (
              <li key={id}>
                <div className="flex justify-between">
                  <span className="text-base font-medium text-black capitalize">
                    {category}
                  </span>
                  <span className="text-base font-semibold text-gray-700">
                    $ {amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666] font-base">Date: {date}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-yellow-700 capitalize font-normal"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      className="text-red-600 capitalize font-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;
