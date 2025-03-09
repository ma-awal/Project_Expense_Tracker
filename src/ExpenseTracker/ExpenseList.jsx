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
  if (priceFilter === 'High to Low') {
    filteredTransactions = filteredTransactions.sort(
      (a, b) => b.amount - a.amount
    );
  } else if (priceFilter === 'Low to High') {
    filteredTransactions = filteredTransactions.sort(
      (a, b) => a.amount - b.amount
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-2">
        <h3 className="text-xl font-semibold">{type}</h3>
        <div className="flex space-x-2">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border rounded-lg py-1 px-2 w-36 text-base"
          >
            <option value="" className=" ">
              Price Fillter
            </option>
            <option value="High to Low"> High to Low</option>
            <option value="Low to High"> Low to High</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg py-1 px-2 w-40 text-base "
          >
            <option value="">Category Fillter</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="border rounded-lg p-3  bg-gray-50 h-64 overflow-y-auto space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-lg font-semibold text-center capitalize">
            No transactions available.
          </p>
        ) : (
          filteredTransactions.map((transaction) => {
            const { category, amount, date, id } = transaction;
            return (
              <li key={id} className="     border-b border-b-slate-300">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-black capitalize">
                    {category}
                  </span>
                  <span className="text-base font-semibold text-gray-700">
                    ${amount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666]  "> {date}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-yellow-700 capitalize font-normal"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      className="text-red-600 capitalize  "
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
