"use client";

import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  MdAccountBalanceWallet,
  MdAddCard,
  MdInsights,
  MdRocketLaunch,
} from "react-icons/md";

const HowItWorks = () => {
  return (
    <section className="flex items-center justify-center px-4 py-12 bg-gray-900 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl text-center"
      >
        {/* TITLE */}
        <motion.h2
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl sm:text-4xl font-extrabold text-gray-100 mb-4"
        >
          How It Works
        </motion.h2>

        {/* DESCRIPTION */}
        <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
          A simple way to manage your expenses and track your finances efficiently.
        </p>

        {/* HOW TO USE (NEW WITH ICON) */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
          <MdRocketLaunch className="text-xl text-yellow-400" />
          <span>Set up in minutes and start tracking instantly</span>
        </div>

        {/* STEPS */}
        <div className="mt-12 space-y-10 text-left relative">

          {/* vertical line (FIXED POSITION) */}
          <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-white/10" />

          {[
            {
              icon: <FcGoogle className="text-2xl" />,
              title: "Sign in with Google",
              desc: "Secure login using Google authentication.",
            },
            {
              icon: (
                <MdAccountBalanceWallet className="text-2xl text-yellow-400" />
              ),
              title: "Set Monthly Budget",
              desc: "Define your spending limit and stay in control.",
            },
            {
              icon: <MdAddCard className="text-2xl text-blue-400" />,
              title: "Add Expenses",
              desc: "Track your daily expenses in seconds.",
            },
            {
              icon: <MdInsights className="text-2xl text-green-400" />,
              title: "Track & Analyze",
              desc: "Get insights into your spending habits.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex gap-5 pl-14 relative items-start"
            >
              {/* ICON (aligned with line) */}
              <div className="absolute left-2 top-1">
                {step.icon}
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-gray-100 font-semibold text-lg">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;