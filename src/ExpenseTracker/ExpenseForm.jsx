import React, { useState } from 'react';

function ExpenseForm({ activeTab, categories, onSave, transactionToUpdate }) {
  const [newTransaction, setNewTransaction] = useState(
    transactionToUpdate || {
      id: crypto.randomUUID(),
      category: '',
      amount: '',
      date: '',
      type: activeTab,
    }
  );
  if (transactionToUpdate && transactionToUpdate.id !== newTransaction.id) {
    setNewTransaction({
      id: transactionToUpdate.id,
      category: transactionToUpdate.category,
      amount: transactionToUpdate.amount,
      date: transactionToUpdate.date,
      type: transactionToUpdate.type,
    });
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
      type: activeTab,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const isAdd = !transactionToUpdate?.id;
    onSave(newTransaction, isAdd);
    setNewTransaction({
      id: crypto.randomUUID(),
      category: '',
      amount: '',
      date: '',
      type: activeTab,
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2"> Category</label>
        <select
          name="category"
          value={newTransaction.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select a Category</option>
          {categories[activeTab].map((category, index) => {
            return (
              <option value={category} key={index}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Add {activeTab}
      </button>
    </form>
  );
}

export default ExpenseForm;
