import React from 'react';

function ExpenseBalance({ transactions }) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-200   p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Total Balance</h3>
        <p className="text-xl font-bold">
          {transactions.length === 0
            ? 'No Transaction yet'
            : `$${totalBalance}`}
        </p>
      </div>
      <div className="bg-green-200   p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Income</h3>
        <p className="text-xl font-bold">
          {transactions.length === 0 ? '0' : `$${totalIncome}  `}
        </p>
      </div>
      <div className="bg-red-200   p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Expense</h3>
        <p className="text-xl font-bold">
          {transactions.length === 0 ? '0' : `$${totalExpense}  `}
        </p>
      </div>
    </div>
  );
}

export default ExpenseBalance;
