import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpenseTracker from './ExpenseTracker';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className=" lg:container flex-grow flex items-center justify-center">
        <ExpenseTracker />
      </main>
      <Footer />
    </div>
  );
}
