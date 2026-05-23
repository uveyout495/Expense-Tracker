"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaUserShield, FaSearch, FaUserCircle } from "react-icons/fa";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

interface User {
  _id: string;
  fullname: string;
  email: string;
  todayExpense: number;
  monthExpense: number;
  yearExpense: number;
  totalExpense: number;
  role: "user" | "admin";
}

const AdminPanel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const [users, setUsers] = useState<User[]>([
    {
      _id: "1",
      fullname: "Rahul Sharma",
      email: "rahul@gmail.com",
      todayExpense: 1200,
      monthExpense: 18000,
      yearExpense: 120000,
      totalExpense: 180000,
      role: "user",
    },
    {
      _id: "2",
      fullname: "Priya Patil",
      email: "priya@gmail.com",
      todayExpense: 800,
      monthExpense: 12000,
      yearExpense: 90000,
      totalExpense: 140000,
      role: "admin",
    },
    {
      _id: "3",
      fullname: "Amit Joshi",
      email: "amit@gmail.com",
      todayExpense: 400,
      monthExpense: 7000,
      yearExpense: 45000,
      totalExpense: 65000,
      role: "user",
    },
  ]);

  const totalUsers = users.length;

  const filteredUsers = users.filter(
    (u) =>
      u.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const makeAdminHandler = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, role: "admin" } : u
      )
    );
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-[#070B1A] text-white" : "bg-[#F4F7FB] text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-white/40 dark:bg-black/20">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Hiisab Admin
            </h1>
            <p className="text-sm opacity-70">
              Manage users, roles & expenses
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search users..."
                className={`pl-12 pr-10 py-3 rounded-2xl w-[280px] outline-none transition shadow-sm
                ${
                  darkMode
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-white border border-gray-200"
                }`}
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-2xl transition hover:scale-105 ${
                darkMode
                  ? "bg-slate-800 text-yellow-300"
                  : "bg-white shadow"
              }`}
            >
              {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* STATS CARD */}
        <div
          className={`relative overflow-hidden rounded-3xl p-8 shadow-xl border transition
          ${
            darkMode
              ? "bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          }`}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl" />

          <div className="flex justify-between items-center relative">
            <div>
              <p className="opacity-80">Total Registered Users</p>
              <h2 className="text-6xl font-black mt-2">{totalUsers}</h2>
              <p className="opacity-80 mt-1">Active users in system</p>
            </div>

            <div className="hidden sm:flex w-24 h-24 items-center justify-center rounded-full bg-white/10">
              <FaUsers size={40} />
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden">
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search users..."
              className={`pl-12 pr-4 py-3 w-full rounded-2xl outline-none border ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            />
          </div>
        </div>

        {/* TABLE */}
        <div
          className={`rounded-3xl overflow-hidden shadow-xl border transition
          ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="p-6 border-b border-gray-200/20">
            <h2 className="text-2xl font-bold">All Users</h2>
            <p className="text-sm opacity-70">User management dashboard</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead
                className={`text-sm ${
                  darkMode ? "bg-slate-800" : "bg-gray-50"
                }`}
              >
                <tr>
                  <th className="p-5 text-left">User</th>
                  <th className="p-5 text-left">Today</th>
                  <th className="p-5 text-left">Month</th>
                  <th className="p-5 text-left">Year</th>
                  <th className="p-5 text-left">Total</th>
                  <th className="p-5 text-left">Role</th>
                  <th className="p-5 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-slate-800/30 transition"
                  >
                    <td className="p-5 flex items-center gap-4">
                      <FaUserCircle size={28} />
                      <div>
                        <p className="font-bold">{user.fullname}</p>
                        <p className="text-sm opacity-70">{user.email}</p>
                      </div>
                    </td>

                    <td className="p-5 text-green-400 font-semibold">
                      ₹{user.todayExpense}
                    </td>
                    <td className="p-5 text-blue-400 font-semibold">
                      ₹{user.monthExpense}
                    </td>
                    <td className="p-5 text-orange-400 font-semibold">
                      ₹{user.yearExpense}
                    </td>
                    <td className="p-5 text-red-400 font-bold">
                      ₹{user.totalExpense}
                    </td>

                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === "admin"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-200 text-gray-600 dark:bg-slate-800 dark:text-gray-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-5">
                      {user.role !== "admin" ? (
                        <button
                          onClick={() => makeAdminHandler(user._id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 transition"
                        >
                          <FaUserShield /> Make Admin
                        </button>
                      ) : (
                        <span className="text-green-400 font-bold">
                          Already Admin
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-16 text-center">
                <div className="text-5xl">😔</div>
                <h2 className="text-xl font-bold mt-3">No Users Found</h2>
                <p className="opacity-70">
                  Try a different search keyword
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;