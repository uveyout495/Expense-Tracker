"use client";

import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
];

const ExpenseCharts = ({
  totalData,
  monthData,
  todayData,
}: any) => {

  // RANDOM MONTH DATA
  const monthlyTrend = [
    { month: "Jan", amount: 4500 },
    { month: "Feb", amount: 6200 },
    { month: "Mar", amount: 5400 },
    { month: "Apr", amount: 7800 },
    { month: "May", amount: 8500 },
    { month: "Jun", amount: 6900 },
    { month: "Jul", amount: 9200 },
    { month: "Aug", amount: 8800 },
    { month: "Sep", amount: 9900 },
    { month: "Oct", amount: 10200 },
    { month: "Nov", amount: 11000 },
    { month: "Dec", amount: 12000 },
  ];

  // RANDOM YEAR DATA
  const yearlyData = [
    { year: "2021", amount: 42000 },
    { year: "2022", amount: 58000 },
    { year: "2023", amount: 76000 },
    { year: "2024", amount: 92000 },
    { year: "2025", amount: 120000 },
  ];

  // CATEGORY WISE
  const categoryMap: any = {};

  totalData?.forEach((item: any) => {
    if (categoryMap[item.expanceCategory]) {
      categoryMap[item.expanceCategory] += item.price;
    } else {
      categoryMap[item.expanceCategory] = item.price;
    }
  });

  const categoryData =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).map((key) => ({
          name: key,
          value: categoryMap[key],
        }))
      : [
          { name: "Food", value: 4000 },
          { name: "Shopping", value: 7000 },
          { name: "Movies", value: 2000 },
          { name: "Bills", value: 5000 },
        ];

  // TODAY GRAPH
  const todayGraph =
    todayData?.length > 0
      ? todayData.map((item: any) => ({
          time: new Date(item.date).toLocaleTimeString(
            "en-IN",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          amount: item.price,
        }))
      : [
          { time: "9 AM", amount: 200 },
          { time: "11 AM", amount: 500 },
          { time: "1 PM", amount: 1200 },
          { time: "4 PM", amount: 800 },
          { time: "8 PM", amount: 1500 },
        ];

  // PAYMENT METHODS
  const paymentData = [
    { name: "UPI", amount: 12000 },
    { name: "Cash", amount: 5000 },
    { name: "Card", amount: 9000 },
    { name: "Wallet", amount: 4000 },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 p-6 gap-6 mt-8">

      {/* MONTHLY TREND */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-5">
          Monthly Expense Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient
                id="colorExpense"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#3B82F6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#3B82F6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* TODAY GRAPH */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-5">
          Today's Expenses
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={todayGraph}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#10B981"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CATEGORY PIE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-5">
          Categories
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {categoryData.map(
                (_: any, index: number) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-5">
          Payment Methods
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="amount"
              fill="#8B5CF6"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* YEARLY ANALYTICS */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg xl:col-span-2">
        <h2 className="text-2xl font-bold mb-5">
          Yearly Analytics
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="year" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#EF4444"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;