"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
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
      {/* BACKGROUND IMAGE */}
      <Image
        src="/imageone.png"
        alt="daily expense tracking"
        fill
        priority
        className="object-cover opacity-25"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-8 md:px-16 lg:px-20">
        <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">
          {/* TITLE */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-snug md:leading-tight">
            Daily Hisab, <br />
            <span className="text-yellow-400">
              Made Simple
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
            Track your रोज का खर्च easily from chai ☕ to
            petrol ⛽. Stay in control of your money without
            any confusion.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              onClick={onClickHandler}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition w-full sm:w-auto"
            >
              Start Tracking
            </button>

            <button
              onClick={() =>
                navigate.push("/ask")
              }
              className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition w-full sm:w-auto"
            >
              How it Works
            </button>
          </div>

          {/* TAGLINE */}
          <p className="text-xs sm:text-sm text-gray-500 pt-2 sm:pt-4">
            Simple • Fast • No bakwas
          </p>
        </div>
      </div>

      {/* TODAY EXPENSE BOX */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-10 lg:right-20 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-5 w-[90%] max-w-[320px] sm:w-[260px] text-white shadow-xl">
        <p className="text-xs sm:text-sm text-gray-400 mb-2">
          Today
        </p>

        <ul className="space-y-1 text-xs sm:text-sm max-h-[160px] overflow-auto">
          {todayExpance?.data?.expances?.length >
          0 ? (
            todayExpance?.data?.expances?.map(
              (item: any, index: number) => (
                <li
                  key={index}
                  className="truncate"
                >
                  {item.item
                    ? item.item
                        .charAt(0)
                        .toUpperCase() +
                      item.item.slice(1)
                    : ""}{" "}
                  - ₹{item.price}
                </li>
              )
            )
          ) : (
            <p className="text-gray-500 text-xs sm:text-sm text-center py-4">
              No expenses recorded for today.
            </p>
          )}
        </ul>

        <div className="border-t border-white/10 mt-3 pt-2 font-semibold text-sm sm:text-base">
          Total: ₹{todayExpance?.data?.total || 0}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;