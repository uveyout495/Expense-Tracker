"use client";

import React, { useEffect, useState } from "react";

import {
  useAddBalanceMutation,
  useEditBalanceMutation,
  useGetRecentBalanceQuery,
  useGetTotalBalanceQuery,
} from "../store/api/balanceApi";

import { toast } from "react-toastify";

import { BiLoader } from "react-icons/bi";
import { FiEdit2, FiX } from "react-icons/fi";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Hiissab = () => {
  // ================= API =================
  const [
    addBalance,
    {
      data: balanceData,
      isLoading,
      error: balanceError,
    },
  ] = useAddBalanceMutation();

  const [
    editBalance,
    {
      data: editBalanceData,
      isLoading: isEditLoading,
      error: editBalanceError,
    },
  ] = useEditBalanceMutation();

  const { data: recentData } =
    useGetRecentBalanceQuery({});

  const { data: totalBalanceData } =
    useGetTotalBalanceQuery({});

  // ================= STATE =================
  const [balanceFormData, setBalanceFormData] =
    useState({
      amount: "",
      incomeSource: "",
    });

  const [editAmount, setEditAmount] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  // ================= GRAPH DATA =================
  const graphData =
    recentData?.balance?.map(
      (item: any, index: number) => ({
        name:
          item?.incomeSource ||
          `T${index + 1}`,
        amount: Number(item?.amount),
      })
    ) || [];

  // ================= HANDLERS =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBalanceFormData({
      ...balanceFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHander = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await addBalance({
      formData: balanceFormData,
    });
  };

  const handleEditBalance = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await editBalance(editAmount);

    setOpenDialog(false);
  };

  // ================= TOAST =================
  useEffect(() => {
    if (balanceData) {
      toast.success(balanceData?.message);

      setBalanceFormData({
        amount: "",
        incomeSource: "",
      });
    }

    if (balanceError) {
      toast.error(
        (balanceError as any)?.data?.message ||
          "Error In Adding Balance"
      );
    }
  }, [balanceData, balanceError]);

  useEffect(() => {
    if (editBalanceData) {
      toast.success(
        editBalanceData?.message ||
          "Balance Updated"
      );

      setEditAmount("");
    }

    if (editBalanceError) {
      toast.error(
        (editBalanceError as any)?.data?.message ||
          "Error Updating Balance"
      );
    }
  }, [editBalanceData, editBalanceError]);

  return (
    <>
      {/* ================= MAIN ================= */}
      <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center px-4 sm:px-8 md:px-20 py-12">

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl w-full max-w-4xl p-8 text-white">

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold mb-8 text-yellow-400 text-center tracking-wide"
          >
            Add Balance
          </motion.h1>

          {/* TOTAL BALANCE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            className="bg-yellow-400 text-black text-center py-6 rounded-2xl mb-8 shadow-lg"
          >
            <h2 className="text-xl font-semibold">
              Total Balance
            </h2>

            <p className="text-3xl sm:text-4xl mt-2 font-bold">
              ₹{" "}
              {totalBalanceData?.balance
                ?.totalBalance || 0}
            </p>

            <p className="text-sm text-gray-800 mt-1">
              Keep track of your finances
              effortlessly
            </p>
          </motion.div>

          {/* ADD FORM */}
          <form onSubmit={onSubmitHander}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              {/* AMOUNT */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Income Amount
                </label>

                <input
                  type="number"
                  placeholder="Enter amount"
                  name="amount"
                  value={balanceFormData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white transition-all duration-300"
                />
              </div>

              {/* SOURCE */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Income Source
                </label>

                <input
                  type="text"
                  name="incomeSource"
                  value={
                    balanceFormData.incomeSource
                  }
                  onChange={handleChange}
                  placeholder="Job / Parents / Other"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white transition-all duration-300"
                />
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold transition duration-200 mb-6"
            >
              {isLoading ? (
                <BiLoader
                  className="animate-spin"
                  size={22}
                />
              ) : null}

              Add Income
            </motion.button>
          </form>

          {/* EDIT BUTTON */}
          <div className="text-center mb-8 flex items-center justify-center">
            <p className="text-gray-300">
              Do Want to Edit Your Balance?

              <button
                onClick={() =>
                  setOpenDialog(true)
                }
                className="text-yellow-400 hover:text-yellow-500 ml-2"
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  <FiEdit2 />
                  Click Here
                </div>
              </button>
            </p>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
              Recent Transactions
            </h2>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-3">
              {recentData?.balance?.map(
                (
                  item: any,
                  i: number
                ) => {
                  return (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: i * 0.1,
                      }}
                      className="flex justify-between py-2 px-3 bg-white/10 rounded-lg"
                    >
                      <span>
                        {item?.incomeSource}
                      </span>

                      <span>
                        ₹ {item?.amount}
                      </span>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>

          {/* GRAPH */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
              Monthly Overview
            </h2>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="w-full h-[320px] bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10"
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={graphData}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                  />

                  <YAxis stroke="#9CA3AF" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        "#111827",
                      border:
                        "1px solid #facc15",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#facc15"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: "#facc15",
                    }}
                    activeDot={{
                      r: 8,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* FOOTER */}
          <p className="text-gray-400 text-center mt-6 text-sm">
            💡 Keep tracking your income and
            expenses consistently.
          </p>
        </div>
      </section>

      {/* ================= DIALOG ================= */}
      <AnimatePresence>
        {openDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            >
              {/* CLOSE */}
              <button
                onClick={() =>
                  setOpenDialog(false)
                }
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <FiX size={22} />
              </button>

              {/* TITLE */}
              <h1 className="text-2xl font-bold text-yellow-400 mb-2">
                Edit Balance
              </h1>

              <p className="text-gray-400 text-sm mb-6">
                Update your total balance
                amount
              </p>

              {/* FORM */}
              <form
                onSubmit={
                  handleEditBalance
                }
              >
                <div className="mb-5">
                  <label className="block text-gray-300 font-medium mb-2">
                    New Amount
                  </label>

                  <input
                    type="number"
                    placeholder="Enter new balance"
                    value={editAmount}
                    onChange={(e) =>
                      setEditAmount(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                  />
                </div>

                {/* SUBMIT */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold transition duration-200"
                >
                  {isEditLoading ? (
                    <BiLoader
                      className="animate-spin"
                      size={22}
                    />
                  ) : null}

                  Update Balance
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hiissab;