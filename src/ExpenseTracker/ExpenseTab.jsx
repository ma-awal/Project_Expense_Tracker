export default function ExpenseTab({ activeTab, setActiveTab }) {
  return (
    <div className="mb-6 flex justify-between">
      {['Income', 'Expense'].map((tab) => (
        <button
          key={tab}
          className={`w-1/2 py-2 rounded-l-lg border text-center ${
            activeTab === tab
              ? 'bg-red-500 text-white'
              : 'bg-orange-200 text-black'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
