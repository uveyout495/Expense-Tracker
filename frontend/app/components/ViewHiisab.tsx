"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { GiCalendarHalfYear } from "react-icons/gi";
import { IoTodayOutline } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";

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

  const todayTotal =
    todayExpanceData?.data?.reduce(
      (acc: number, item: any) => acc + (item?.price || 0),
      0
    ) || 0;

  const monthTotal = thisMonthData?.data?.total || 0;
  const yearTotal = thisYearData?.data?.total || 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="text-center max-w-xl">

          <div className="text-5xl mb-4">💰</div>

          <h1 className="text-4xl font-bold">
            Manage Your Money Like a Pro
          </h1>

          <p className="text-white/60 mt-4">
            Track your daily, monthly, and yearly expenses in one simple dashboard.
          </p>

          <div className="flex gap-4 justify-center mt-8">

            <button
              onClick={() => navigate.push("/login")}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate.push("/signup")}
              className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              Signup
            </button>

          </div>

        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Today",
      amount: todayTotal,
      icon: <IoTodayOutline size={24} />,
      color: "from-blue-500 to-cyan-400",
      link: "/hiisabdashboard",
    },
    {
      title: "Monthly",
      amount: monthTotal,
      icon: <MdCalendarMonth size={24} />,
      color: "from-green-500 to-emerald-400",
      link: "/hiisabdashboard",
    },
    {
      title: "Yearly",
      amount: yearTotal,
      icon: <GiCalendarHalfYear size={24} />,
      color: "from-purple-500 to-indigo-400",
      link: "/hiisabdashboard",
    },
  ];

  return (
    <div className="bg-[#050505] text-white  p-10 relative overflow-hidden">

      
      <div className="absolute w-[600px] h-[600px] bg-yellow-500/10 blur-[140px] top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] bottom-[-200px] right-[-200px]" />

      
      <div className="px-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
          Your Expense Overview
        </h2>

        <p className="text-white/50 mt-2 text-sm">
          Track daily, monthly & yearly spending with clarity
        </p>
      </div>

      {/* CARDS */}
      <div className="px-8 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => navigate.push(c.link)}
            className="group relative cursor-pointer rounded-2xl p-[1px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:scale-[1.07] transition duration-300"
          >

            {/* glow border animation */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-yellow-400/20 via-transparent to-purple-400/20 blur-xl"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all">

              {/* TOP */}
              <div className="flex items-center gap-4">

                <div
                  className={`p-4 rounded-xl bg-gradient-to-r ${c.color} shadow-md group-hover:scale-110 transition`}
                >
                  {c.icon}
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    {c.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-1 group-hover:text-yellow-400 transition">
                    ₹{c.amount}
                  </h2>
                </div>

              </div>

              {/* PROGRESS */}
              <div className="mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-gradient-to-r from-yellow-400 to-orange-400 group-hover:w-[88%] transition-all duration-500"></div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ViewHiisab;