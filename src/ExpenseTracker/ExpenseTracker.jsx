import React, { useState } from 'react';
import ExpenseTab from './ExpenseTab';
import ExpenseForm from './ExpenseForm';
import ExpenseBalance from './ExpenseBalance';
import ExpenseList from './ExpenseList';

const ExpenseTracker = () => {
  const [transactions, setTransections] = useState([]);
  const [activeTab, setActiveTab] = useState('Income');
  const [transactionToUpdate, setTransactionToUpdate] = useState(null);

  const categories = {
    Income: ['Salary', 'Freelancing', 'Business'],
    Expense: ['Education', 'Treatment', 'Travel'],
  };
  function handleAddEditTransactions(newTransaction, isAdd) {
    if (isAdd) {
      setTransections([...transactions, newTransaction]);
    } else {
      setTransections(
        transactions.map((transaction) =>
          transaction.id === newTransaction.id ? newTransaction : transaction
        )
      );
    }
    setTransactionToUpdate(null);
  }

  function handleEditTransaction(transaction) {
    setTransactionToUpdate(transaction);
  }
  function handleDeleteTransaction(transactionId) {
    const restTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    setTransections(restTransactions);
  }
  return (
    <div className="  bg-gray-100 p-8   ">
      <div className="  mx-auto grid grid-cols-12 gap-6 ">
        <div className="col-span-4 bg-white p-6 rounded-lg shadow-md">
          <ExpenseTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <ExpenseForm
            activeTab={activeTab}
            categories={categories}
            transactionToUpdate={transactionToUpdate}
            onSave={handleAddEditTransactions}
          />
        </div>

        <div className="col-span-8 bg-white p-6 rounded-lg shadow-md">
          <ExpenseBalance transactions={transactions} />

          <div className="grid grid-cols-2 gap-4">
            {['Income', 'Expense'].map((type) => {
              return (
                <ExpenseList
                  key={type}
                  transactions={transactions}
                  type={type}
                  categories={categories[type]}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
