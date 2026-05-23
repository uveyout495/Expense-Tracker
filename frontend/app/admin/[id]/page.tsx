"use client";

import React, { useState } from "react";

import {
  FaMoneyBillWave,
  FaCalendarDay,
  FaCalendar,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";

// RANDOM USERS
const randomUsers = [
  {
    fullname: "Rahul Sharma",
    email: "rahul@gmail.com",
    todayExpense: 1200,
    monthExpense: 18000,
    yearExpense: 120000,
    totalExpense: 180000,
    role: "user",
    joined: "2 days ago",
  },
  {
    fullname: "Priya Patil",
    email: "priya@gmail.com",
    todayExpense: 800,
    monthExpense: 12000,
    yearExpense: 90000,
    totalExpense: 140000,
    role: "admin",
    joined: "1 month ago",
  },
];

// RANDOM EXPENSES
const randomExpenses = [
  {
    item: "Grocery",
    price: 1200,
    category: "Food",
    payment: "UPI",
    date: "2026-05-20",
    notes: "Monthly grocery",
  },
  {
    item: "Petrol",
    price: 500,
    category: "Transport",
    payment: "Cash",
    date: "2026-05-21",
    notes: "Bike fuel",
  },
  {
    item: "Movie",
    price: 300,
    category: "Entertainment",
    payment: "Card",
    date: "2026-05-22",
    notes: "Weekend movie",
  },
  {
    item: "Mobile Recharge",
    price: 299,
    category: "Bills",
    payment: "UPI",
    date: "2026-05-22",
    notes: "Jio recharge",
  },
];

const UserData = () => {
  const [user] = useState(
    randomUsers[
      Math.floor(Math.random() * randomUsers.length)
    ]
  );

  const [expenses] = useState(randomExpenses);

  return (
    <div className="w-full rounded-3xl p-6 shadow-lg bg-white dark:bg-slate-900 transition-all duration-500">

      {/* USER HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <FaUserCircle className="text-blue-500" size={40} />

        <div>
          <h2 className="text-xl font-bold">
            {user.fullname}
          </h2>
          <p className="text-sm text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* EXPENSE SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="p-4 rounded-2xl bg-green-500/10">
          <FaCalendarDay className="text-green-500" />
          <p className="text-sm mt-2">Today</p>
          <p className="text-xl font-bold">
            ₹{user.todayExpense}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-500/10">
          <FaCalendarAlt className="text-blue-500" />
          <p className="text-sm mt-2">Month</p>
          <p className="text-xl font-bold">
            ₹{user.monthExpense}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-orange-500/10">
          <FaCalendar className="text-orange-500" />
          <p className="text-sm mt-2">Year</p>
          <p className="text-xl font-bold">
            ₹{user.yearExpense}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-red-500/10">
          <FaMoneyBillWave className="text-red-500" />
          <p className="text-sm mt-2">Total</p>
          <p className="text-xl font-black">
            ₹{user.totalExpense}
          </p>
        </div>
      </div>

      {/* EXPENSE TABLE */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="text-left border-b dark:border-slate-700">
              <th className="p-3">Item</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Date</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp, i) => (
              <tr
                key={i}
                className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td className="p-3 font-semibold">
                  {exp.item}
                </td>

                <td className="p-3 text-green-600 font-bold">
                  ₹{exp.price}
                </td>

                <td className="p-3">
                  {exp.category}
                </td>

                <td className="p-3">
                  {exp.payment}
                </td>

                <td className="p-3">
                  {exp.date}
                </td>

                <td className="p-3 text-gray-500">
                  {exp.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserData;