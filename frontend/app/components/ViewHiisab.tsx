"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { GiCalendarHalfYear } from "react-icons/gi";
import { IoTodayOutline } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

import {
  useGetThisMonthExpanceQuery,
  useGetThisYearExpanceQuery,
  useGetTodayExpanceQuery,
} from "../store/api/expanceApi";

const ViewHiisab = () => {
  const navigate = useRouter();
  const { user } = useSelector((state: any) => state.user);

  const { data: todayExpanceData } = useGetTodayExpanceQuery({});
  const { data: thisMonthData } = useGetThisMonthExpanceQuery({}, { skip: !user });
  const { data: thisYearData } = useGetThisYearExpanceQuery({}, { skip: !user });

  // ==========================
  // NOT LOGGED IN UI
  // ==========================
  if (!user) {
    return (
      <div className="min-h-[75vh] bg-[#050505] text-white flex items-center justify-center px-5 py-10">

        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
              <FaRegMoneyBillAlt />
              Expense Tracker
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
              Manage Your
              <span className="block text-yellow-400">
                Daily Expenses
              </span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/60 max-w-md">
              Track daily spending, monthly reports and yearly insights in one simple dashboard.
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => navigate.push("/signup")}
                className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-medium hover:opacity-90 transition"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate.push("/login")}
                className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/10 transition"
              >
                Login
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-7 text-sm text-white/70">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <FiTrendingUp />
                Daily Tracking
              </span>

              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <MdCalendarMonth />
                Monthly Reports
              </span>

              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <GiCalendarHalfYear />
                Yearly Analytics
              </span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <FiTrendingUp />
              Expense Overview
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
                <div>
                  <p className="text-xs text-white/50">Today</p>
                  <h2 className="text-lg font-bold">₹1,250</h2>
                </div>
                <IoTodayOutline size={22} />
              </div>

              <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
                <div>
                  <p className="text-xs text-white/50">This Month</p>
                  <h2 className="text-lg font-bold">₹24,850</h2>
                </div>
                <MdCalendarMonth size={22} />
              </div>

              <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
                <div>
                  <p className="text-xs text-white/50">This Year</p>
                  <h2 className="text-lg font-bold">₹2,91,400</h2>
                </div>
                <GiCalendarHalfYear size={22} />
              </div>

            </div>

            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-white/50">Budget Usage</span>
                <span className="text-yellow-400">78%</span>
              </div>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-yellow-400 rounded-full" />
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // ==========================
  // LOGGED IN UI
  // ==========================

  const todayTotal =
    todayExpanceData?.data?.reduce(
      (acc: number, item: any) => acc + (item?.price || 0),
      0
    ) || 0;

  const monthTotal = thisMonthData?.data?.total || 0;
  const yearTotal = thisYearData?.data?.total || 0;

  const cards = [
    {
      title: "Today",
      amount: todayTotal,
      icon: <IoTodayOutline size={20} />,
      color: "from-blue-500 to-cyan-400",
      link: "/hiisabdashboard",
    },
    {
      title: "Monthly",
      amount: monthTotal,
      icon: <MdCalendarMonth size={20} />,
      color: "from-green-500 to-emerald-400",
      link: "/hiisabdashboard",
    },
    {
      title: "Yearly",
      amount: yearTotal,
      icon: <GiCalendarHalfYear size={20} />,
      color: "from-purple-500 to-indigo-400",
      link: "/hiisabdashboard",
    },
  ];

  return (
    <div className="bg-[#050505] text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
          Your Expense Overview
        </h2>

        <p className="text-white/50 mt-2 text-sm">
          Track daily, monthly & yearly spending
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          {cards.map((c, i) => (
            <div
              key={i}
              onClick={() => navigate.push(c.link)}
              className="cursor-pointer rounded-2xl p-[1px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:scale-105 transition"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <div className={`p-3 rounded-xl bg-gradient-to-r ${c.color}`}>
                    {c.icon}
                  </div>

                  <div>
                    <p className="text-white/50 text-xs">{c.title}</p>
                    <h2 className="text-xl font-bold">₹{c.amount}</h2>
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ViewHiisab;