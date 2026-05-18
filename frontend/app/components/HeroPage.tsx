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
      {/* BACKGROUND */}
      <Image
        src="/imageone.png"
        alt="daily expense tracking"
        fill
        priority
        className="object-cover opacity-25"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-8 md:px-16 lg:px-20">
        <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            Daily Hisab, <br />
            <span className="text-yellow-400">
              Made Simple
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Track your रोज का खर्च easily from chai ☕ to
            petrol ⛽. Stay in control of your money without
            any confusion.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClickHandler}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold w-full sm:w-auto"
            >
              Start Tracking
            </button>

            <button
              onClick={() =>
                navigate.push("/ask")
              }
              className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-white hover:text-black w-full sm:w-auto"
            >
              How it Works
            </button>
          </div>
        </div>
      </div>

      {/* TODAY EXPENSE BOX (RESPONSIVE SHEET) */}
      <div
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
        <p className="text-xs sm:text-sm text-gray-300 mb-2">
          Today
        </p>

        <ul className="space-y-1 text-xs sm:text-sm">
          {todayExpance?.data?.expances?.length >
          0 ? (
            todayExpance?.data?.expances?.map(
              (item: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between gap-2"
                >
                  <span className="truncate">
                    {item.item
                      ? item.item
                          .charAt(0)
                          .toUpperCase() +
                        item.item.slice(1)
                      : ""}
                  </span>

                  <span className="text-yellow-300 whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </li>
              )
            )
          ) : (
            <p className="text-gray-400 text-xs text-center py-4">
              No expenses recorded today
            </p>
          )}
        </ul>

        <div className="border-t border-white/10 mt-3 pt-2 font-semibold text-sm">
          Total: ₹{todayExpance?.data?.total || 0}
        </div>
      </div>
    </section>
  );
};

export default HeroPage;