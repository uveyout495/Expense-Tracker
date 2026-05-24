"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import { useGetTodayExpanceQuery } from "../store/api/expanceApi";

import { useDispatch, useSelector } from "react-redux";

import { setErrorMessage } from "../store/slice/userSlice";

import { toast } from "react-toastify";

const HeroPage = () => {
  const navigate = useRouter();

  const dispatch = useDispatch();

  const { data: todayExpance } =
    useGetTodayExpanceQuery({});

  const { user } = useSelector(
    (state: any) => state.user
  );

  // ================= CHANGING TEXT =================
  const texts = [
    "Track your daily expenses effortlessly",
    "Save smarter every single day ",
    "Your personal money manager",
    "Control your खर्च without confusion",
  ];

  const [currentText, setCurrentText] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(
        (prev) =>
          (prev + 1) % texts.length
      );
    }, 2500);

    return () =>
      clearInterval(interval);
  }, []);

  // ================= HANDLER =================
  const onClickHandler = () => {
    if (!user) {
      navigate.push("/");

      dispatch(setErrorMessage(true));

      toast.error(
        "Please sign in to access this page"
      );
    } else {
      navigate.push("/hiisabdashboard");
    }
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">

      {/* BACKGROUND */}
      <motion.div
        initial={{
          scale: 1.1,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        className="absolute inset-0"
      >
        <Image
          src="/imageone.png"
          alt="daily expense tracking"
          fill
          priority
          className="object-cover opacity-25"
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

      {/* FLOATING BLUR EFFECT */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/20 blur-3xl rounded-full animate-pulse" />

      <div className="absolute bottom-20 right-10 w-52 h-52 bg-yellow-500/10 blur-3xl rounded-full animate-pulse" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-8 md:px-16 lg:px-20">

        <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">

          {/* TITLE */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
          >
            Daily Hisab......,
            <br />

            <span className="text-yellow-400">
              Made Simple
            </span>
          </motion.h1>

          {/* CHANGING TEXT */}
          <motion.p
            key={currentText}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-sm sm:text-base md:text-lg text-gray-300 min-h-[30px]"
          >
            {texts[currentText]}
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="text-sm sm:text-base md:text-lg text-gray-400"
          >
            Track your रोज का खर्च
            easily from chai ☕ to
            petrol ⛽. Stay in control
            of your money without any
            confusion.
          </motion.p>

          {/* BUTTONS */}
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
              delay: 0.5,
              duration: 0.7,
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* START BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={onClickHandler}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold w-full sm:w-auto shadow-lg shadow-yellow-500/20"
            >
              Start Tracking
            </motion.button>

            {/* HOW IT WORKS */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() =>
                navigate.push("/ask")
              }
              className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto"
            >
              How it Works
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* TODAY EXPENSE BOX */}
      <motion.div
        initial={{
          opacity: 0,
          x: 100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
        }}
        className="
          fixed sm:absolute
          bottom-0 sm:bottom-6 md:bottom-8 lg:bottom-8
          left-0 sm:left-auto
          right-0 sm:right-4 md:right-10 lg:right-20
          w-full sm:w-[260px] md:w-[280px] lg:w-[300px]
          bg-white/10 backdrop-blur-xl
          border border-white/10
          text-white
          shadow-2xl
          rounded-t-2xl sm:rounded-2xl
          p-4 sm:p-5
          max-h-[45vh] sm:max-h-[260px]
          overflow-y-auto
        "
      >
        {/* TITLE */}
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-xs sm:text-sm text-gray-300 mb-2"
        >
          Today's Expenses
        </motion.p>

        {/* EXPENSE LIST */}
        <ul className="space-y-2 text-xs sm:text-sm">

          {todayExpance?.data?.expances
            ?.length > 0 ? (
            todayExpance?.data?.expances?.map(
              (
                item: any,
                index: number
              ) => (
                <motion.li
                  key={index}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="flex justify-between gap-2 bg-white/5 p-2 rounded-lg"
                >
                  <span className="truncate">
                    {item.item
                      ? item.item
                          .charAt(0)
                          .toUpperCase() +
                        item.item.slice(
                          1
                        )
                      : ""}
                  </span>

                  <span className="text-yellow-300 whitespace-nowrap font-semibold">
                    ₹{item.price}
                  </span>
                </motion.li>
              )
            )
          ) : (
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="text-gray-400 text-xs text-center py-4"
            >
              No expenses recorded
              today
            </motion.p>
          )}
        </ul>

        {/* TOTAL */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="border-t border-white/10 mt-3 pt-3 font-semibold text-sm flex items-center justify-between"
        >
          <span>Total</span>

          <span className="text-yellow-400 text-lg">
            ₹
            {todayExpance?.data
              ?.total || 0}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPage;