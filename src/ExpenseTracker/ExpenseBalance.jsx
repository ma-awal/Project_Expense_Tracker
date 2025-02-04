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
      <div className="bg-gray-200 text-center p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Total Balance</h3>
        <p className="text-2xl font-bold">
          {transactions.length === 0 ? 'No Transaction Yet' : `${totalBalance}`}
        </p>
      </div>
      <div className="bg-green-200 text-center p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Income</h3>
        <p className="text-2xl font-bold">
          {transactions.length === 0 ? '0' : `${totalIncome} Tk`}
        </p>
      </div>
      <div className="bg-red-200 text-center p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Expense</h3>
        <p className="text-2xl font-bold">
          {transactions.length === 0 ? '0' : `${totalExpense} Tk`}
        </p>
      </div>
    </div>
  );
}

export default ExpenseBalance;
