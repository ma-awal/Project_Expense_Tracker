import React, { useState, useEffect } from 'react';

// --- ICONS ---
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);
const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path>
    <path d="M18 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-8Z"></path>
  </svg>
);

const ExpenseTracker = () => {
  // --- STATE ---
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('expense_tracker_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [type, setType] = useState('Income');
  const [formData, setFormData] = useState({
    id: null,
    amount: '',
    category: '',
    date: '',
  });

  const categories = {
    Income: ['Salary', 'Freelancing', 'Business', 'Investments', 'Gift'],
    Expense: [
      'Food',
      'Rent',
      'Transport',
      'Shopping',
      'Utilities',
      'Medical',
      'Education',
    ],
  };

  useEffect(() => {
    localStorage.setItem('expense_tracker_data', JSON.stringify(transactions));
  }, [transactions]);

  // --- CALCULATIONS ---
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;

    if (formData.id) {
      setTransactions(
        transactions.map((t) =>
          t.id === formData.id
            ? { ...formData, type, amount: Number(formData.amount) }
            : t
        )
      );
    } else {
      const newTransaction = {
        ...formData,
        id: Date.now(),
        type,
        amount: Number(formData.amount),
        date: formData.date || new Date().toISOString().split('T')[0],
      };
      setTransactions([newTransaction, ...transactions]);
    }
    setFormData({ id: null, amount: '', category: '', date: '' });
  };

  const handleEdit = (item) => {
    setType(item.type);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen font-sans p-4 md:p-8 relative overflow-hidden bg-slate-50 text-slate-800">
      {/* --- BACKGROUND ANIMATED BLOBS (Filter Effect) --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* --- CUSTOM CSS FOR ANIMATION (Injected directly) --- */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-10 text-center md:text-left flex items-center gap-4 justify-center md:justify-start">
          <div className="p-3 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
            <WalletIcon />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Premium Wallet
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Track your wealth effortlessly
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT: FORM (Glassmorphism) --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
              {/* Toggle Switch */}
              <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-6 relative">
                {['Income', 'Expense'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setType(tab);
                      setFormData({
                        id: null,
                        amount: '',
                        category: '',
                        date: '',
                      });
                    }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 z-10 ${
                      type === tab
                        ? tab === 'Income'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">
                      ৳
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3.5 text-lg font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all shadow-sm group-hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-600 font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories[type].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-600 font-medium focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all shadow-sm cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95 ${
                    type === 'Income'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30'
                  }`}
                >
                  {formData.id ? 'Update Transaction' : 'Add Transaction'}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT: STATS & LIST --- */}
          <div className="lg:col-span-8 space-y-6">
            {/* 3D Gradient Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Balance Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-3xl shadow-xl shadow-indigo-500/20 text-white transform hover:scale-[1.02] transition-all duration-300">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <span className="text-indigo-200 text-sm font-medium tracking-wide">
                  Total Balance
                </span>
                <div className="mt-2 text-3xl font-extrabold tracking-tight">
                  ৳ {balance.toLocaleString()}
                </div>
              </div>

              {/* Income Card */}
              <div className="relative overflow-hidden bg-white p-6 rounded-3xl shadow-lg border border-slate-100 transform hover:scale-[1.02] transition-all duration-300 group">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-50 rounded-tl-full -mr-4 -mb-4 transition-transform group-hover:scale-110"></div>
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  Income
                </span>
                <div className="mt-2 text-3xl font-extrabold text-emerald-500">
                  + ৳ {totalIncome.toLocaleString()}
                </div>
              </div>

              {/* Expense Card */}
              <div className="relative overflow-hidden bg-white p-6 rounded-3xl shadow-lg border border-slate-100 transform hover:scale-[1.02] transition-all duration-300 group">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-rose-50 rounded-tl-full -mr-4 -mb-4 transition-transform group-hover:scale-110"></div>
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  Expense
                </span>
                <div className="mt-2 text-3xl font-extrabold text-rose-500">
                  - ৳ {totalExpense.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Transaction List (Glass Effect) */}
            <div className="backdrop-blur-md bg-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden">
              <div className="p-6 border-b border-slate-100/50 flex justify-between items-center bg-white/40">
                <h3 className="font-bold text-slate-700 text-lg">
                  Recent History
                </h3>
                <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-full shadow-sm">
                  {transactions.length} Transactions
                </span>
              </div>

              <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                {transactions.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
                      <WalletIcon />
                    </div>
                    <p className="text-slate-400 font-medium">
                      No transactions found. Add one!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {transactions
                      .slice()
                      .reverse()
                      .map((t) => (
                        <div
                          key={t.id}
                          className="p-5 hover:bg-white/80 transition-colors duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                                t.type === 'Income'
                                  ? 'bg-emerald-100 text-emerald-600'
                                  : 'bg-rose-100 text-rose-600'
                              }`}
                            >
                              {t.type === 'Income' ? '💰' : '💸'}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-700 text-lg">
                                {t.category}
                              </h4>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">
                                {t.date} • {t.type}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full sm:w-auto gap-6 pl-16 sm:pl-0">
                            <span
                              className={`text-lg font-bold whitespace-nowrap ${
                                t.type === 'Income'
                                  ? 'text-emerald-500'
                                  : 'text-rose-500'
                              }`}
                            >
                              {t.type === 'Income' ? '+' : '-'} ৳{' '}
                              {Number(t.amount).toLocaleString()}
                            </span>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => handleEdit(t)}
                                className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
                              >
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => handleDelete(t.id)}
                                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
