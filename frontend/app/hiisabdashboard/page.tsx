"use client";

import React, { useEffect, useState } from "react";

import {
  FaHome,
  FaCalendarDay,
  FaCalendarAlt,
  FaCalendar,
  FaPlus,
} from "react-icons/fa";

import { LuLogOut } from "react-icons/lu";

import {
  BsXLg,
  BsMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { usePathname, useRouter } from "next/navigation";

import {
  useLoaderUserQuery,
  useLogoutUserMutation,
} from "../store/api/userApi";

import {
  useDeleteExpanceMutation,
  useGetThisMonthExpanceQuery,
  useGetThisYearExpanceQuery,
  useGetTodayExpanceQuery,
  useGetTotalExpanceQuery,
} from "../store/api/expanceApi";

import {
  setErrorMessage,
  setUser,
} from "../store/slice/userSlice";

import AccessDenied from "../components/AccessDenied";

const HiisabDashboard = () => {
  const navigate = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { data } = useLoaderUserQuery({});
  const { user } = useSelector((state: any) => state.user);
  const [text, setText] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [totalExpanceFilter, setTotalExpanceFilter] =
    useState<any>([]);

  const [thisMonthFilter, setThisMonthFilter] =
    useState<any>([]);

  const [todayExpance, setTodayExpance] = useState<any>([]);

  // AUTO DETECT SYSTEM THEME
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    setDarkMode(mediaQuery.matches);

    const handler = (e: any) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () =>
      mediaQuery.removeEventListener("change", handler);
  }, []);

  // APIs
  const [
    logoutUser,
    {
      data: logoutData,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useLogoutUserMutation();

  const {
    data: ThisMonthData,
    refetch: refetchThisMonth,
  } = useGetThisMonthExpanceQuery({});

  const {
    data: ThisYearData,
    refetch: refetchThisYear,
  } = useGetThisYearExpanceQuery({});

  const {
    data: totalExpanceData,
    refetch: refetchTotalExpance,
  } = useGetTotalExpanceQuery({});

  const {
    data: todayExpanceData,
    refetch: refetchTodayExpance,
  } = useGetTodayExpanceQuery({});

  const [
    deleteExpance,
    {
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteExpanceMutation();

  // AUTH CHECK
  useEffect(() => {
    const publicRoutes = [
      "/",
      "/login",
      "/signup",
      "/ask",
    ];

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/");

      dispatch(setErrorMessage(true));

      toast.error(
        "Please sign in to access this page"
      );
    }
  }, [user, pathname, router, dispatch]);

  // LOGOUT
  const onClickLogoutHander = async (
    text: string
  ) => {
    if (text === "Logout") {
      await logoutUser({});

      dispatch(setUser({ user: null }));

      toast.success("Logged Out successfully");
    }
  };

  // DELETE
  const onClickDeleteExpance = async (
    id: string
  ) => {
    if (
      window.confirm(
        "Are you sure you want to delete this expance?"
      )
    ) {
      await deleteExpance(id);
    }
  };

  // EFFECTS
  useEffect(() => {
    if (logoutData) {
      console.log("Logout Success", logoutData);
    }

    if (isLogoutError) {
      console.log("Logout Error", logoutError);
    }

    if (isLogoutSuccess) {
      navigate.push("/login");
    }

    if (isDeleteSuccess) {
      toast.success(
        "Expance Deleted Successfully"
      );

      refetchTotalExpance();
      refetchTodayExpance();
      refetchThisMonth();
      refetchThisYear();
    }
  }, [
    logoutData,
    isLogoutError,
    logoutError,
    isLogoutSuccess,
    isDeleteSuccess,
  ]);

  // TOTAL FILTER
  useEffect(() => {
    const expances =
      totalExpanceData?.expances?.filter(
        (expance: any) => {
          if (!searchText) return true;

          return (
            expance?.item
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.expanceCategory
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.paymentMethod
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.date?.includes(searchText)
          );
        }
      );

    setTotalExpanceFilter(expances);
  }, [
    searchText,
    totalExpanceData?.expances,
  ]);

  // MONTH FILTER
  useEffect(() => {
    const expances =
      ThisMonthData?.data?.expances?.filter(
        (expance: any) => {
          if (!searchText) return true;

          return (
            expance?.item
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.expanceCategory
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.paymentMethod
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.date?.includes(searchText)
          );
        }
      );

    setThisMonthFilter(expances);
  }, [
    searchText,
    ThisMonthData?.data?.expances,
  ]);

  // TODAY FILTER
  useEffect(() => {
    const expances =
      todayExpanceData?.data?.expances?.filter(
        (expance: any) => {
          if (!searchText) return true;

          return (
            expance?.item
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.expanceCategory
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.paymentMethod
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              ) ||
            expance?.date?.includes(searchText)
          );
        }
      );

    setTodayExpance(expances);
  }, [
    searchText,
    todayExpanceData?.data?.expances,
  ]);

  // EMPTY MESSAGE
  const EmptyMessage = ({
    label,
  }: {
    label: string;
  }) => (
    <div className="flex flex-col items-center justify-center py-16">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${darkMode
          ? "bg-gray-700 text-white"
          : "bg-red-100 text-black"
          }`}
      >
        📭
      </div>

      <h2
        className={`mt-4 text-lg font-semibold ${darkMode
          ? "text-white"
          : "text-gray-700"
          }`}
      >
        No Expenses Found
      </h2>

      <p
        className={`text-sm mt-1 text-center px-4 ${darkMode
          ? "text-gray-300"
          : "text-gray-500"
          }`}
      >
        You haven&apos;t added any expenses for{" "}
        <span className="font-medium">
          {label}
        </span>
      </p>
    </div>
  );

  // SIDEBAR ITEMS
  const sidebarItems = [
    {
      icon: <FaHome />,
      label: "All",
    },
    {
      icon: <FaCalendarDay />,
      label: "Today",
    },
    {
      icon: <FaCalendarAlt />,
      label: "This Monthly",
    },
    {
      icon: <FaCalendar />,
      label: "This Yearly",
    },
    {
      icon: <LuLogOut />,
      label: "Logout",
    },
  ];

  // GET CURRENT DATA
  const currentData =
    text === "Today"
      ? todayExpance
      : text === "This Monthly"
        ? thisMonthFilter
        : text === "This Yearly"
          ? ThisYearData?.data?.expances
          : totalExpanceFilter;

  return !data?.user ? (
    <AccessDenied />
  ) : (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-all duration-300 ${darkMode
        ? "bg-[#0f172a] text-white"
        : "bg-gray-100 text-black"
        }`}
    >
      {/* SIDEBAR */}
      <div
        className={`w-full lg:w-[260px] p-4 ${darkMode
          ? "bg-[#020617]"
          : "bg-black text-white"
          }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Hiisab
          </h1>

          {/* DARK MODE BUTTON */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`p-2 rounded-lg transition-all duration-200 ${darkMode
              ? "bg-gray-700 text-yellow-300"
              : "bg-gray-200 text-black"
              }`}
          >
            {darkMode ? (
              <BsSunFill size={18} />
            ) : (
              <BsMoonStarsFill size={18} />
            )}
          </button>
        </div>

        {/* MENU */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setText(item.label);

                item.label === "Logout" &&
                  onClickLogoutHander(
                    item.label
                  );

                item.label === "Today" &&
                  refetchTodayExpance();

                item.label ===
                  "This Monthly" &&
                  refetchThisMonth();

                item.label ===
                  "This Yearly" &&
                  refetchThisYear();

                item.label === "All" &&
                  refetchTotalExpance();
              }}
              className={`flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${text === item.label
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
                : darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-gray-900 hover:bg-gray-800"
                }`}
            >
              {item.icon}

              <span className="hidden sm:block">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-6">
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* CARD 1 */}
          <div
            className={`rounded-2xl p-5 shadow-sm ${darkMode
              ? "bg-slate-800"
              : "bg-white"
              }`}
          >
            <h2
              className={`text-sm ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}
            >
              Total Expense
            </h2>

            <p className="text-3xl font-bold text-red-500 mt-2">
              ₹{totalExpanceData?.data || 0}
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className={`rounded-2xl p-5 shadow-sm ${darkMode
              ? "bg-slate-800"
              : "bg-white"
              }`}
          >
            <h2
              className={`text-sm ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}
            >
              This Month
            </h2>

            <p className="text-3xl font-bold text-blue-500 mt-2">
              ₹
              {ThisMonthData?.data?.total ||
                0}
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className={`rounded-2xl p-5 shadow-sm ${darkMode
              ? "bg-slate-800"
              : "bg-white"
              }`}
          >
            <h2
              className={`text-sm ${darkMode
                ? "text-gray-300"
                : "text-gray-500"
                }`}
            >
              Today
            </h2>

            <p className="text-3xl font-bold text-green-500 mt-2">
              ₹
              {todayExpanceData?.data
                ?.total || 0}
            </p>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row justify-between gap-4 mt-8">
          <div>
            <h2 className="text-2xl font-bold">
              Recent Expenses
            </h2>

            <p
              className={`text-sm mt-1 ${darkMode
                ? "text-gray-400"
                : "text-gray-500"
                }`}
            >
              Manage your daily expenses
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* SELECT */}
            <select
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
              className={`px-4 py-3 rounded-xl outline-none ${darkMode
                ? "bg-slate-800 border border-slate-700 text-white"
                : "bg-black text-white"
                }`}
            >
              <option value="">
                Select Category
              </option>

              <option value="food">
                Food
              </option>

              <option value="shopping">
                Shopping
              </option>

              <option value="movies">
                Movies
              </option>

              <option value="bills">
                Bills
              </option>
            </select>

            {/* SEARCH */}
            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
              placeholder="Search..."
              className={`px-4 py-3 rounded-xl border outline-none ${darkMode
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white"
                }`}
            />

            {/* ADD BUTTON */}
            <button
              onClick={() =>
                navigate.push("/expance")
              }
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              <FaPlus />

              <span>Add</span>
            </button>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div
          className={`hidden lg:block mt-6 rounded-2xl overflow-hidden shadow-sm ${darkMode
            ? "bg-slate-800"
            : "bg-white"
            }`}
        >
          {/* TABLE HEADER */}
          <div
            className={`grid grid-cols-7 p-4 font-semibold text-sm ${darkMode
              ? "bg-slate-700"
              : "bg-gray-200"
              }`}
          >
            <div>Item</div>
            <div>Price</div>
            <div>Category</div>
            <div>Payment</div>
            <div>Date</div>
            <div>Notes</div>
            <div>Remove</div>
          </div>

          {/* TABLE BODY */}
          {currentData?.length > 0 ? (
            currentData.map(
              (row: any, i: number) => (
                <div
                  key={i}
                  onClick={() => navigate.push(`/hiisabdashboard/${row._id}`)}
                  className={`grid grid-cols-7 p-4 border-t text-sm transition-all duration-200 ${darkMode
                    ? "border-slate-700 hover:bg-slate-700"
                    : "hover:bg-gray-50"
                    }`}
                >
                  <div>{row.item}</div>

                  <div>
                    ₹{row.price}
                  </div>

                  <div>
                    {
                      row.expanceCategory
                    }
                  </div>

                  <div>
                    {
                      row.paymentMethod
                    }
                  </div>

                  <div>
                    {new Date(row.date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      year: "2-digit",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="truncate">
                    {row.notes}
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDeleteExpance(row._id);
                      }}
                      className="text-red-500 hover:bg-red-100 hover:text-red-600 p-2 rounded-lg"
                    >
                      <BsXLg size={16} />
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <EmptyMessage label={text} />
          )}
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden mt-6 flex flex-col gap-4">
          {currentData?.length > 0 ? (
            currentData.map(
              (row: any, i: number) => (
                <div
                  key={i}
                  className={`rounded-2xl shadow-sm p-4 ${darkMode
                    ? "bg-slate-800"
                    : "bg-white"
                    }`}
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {row.item}
                      </h3>

                      <p className="text-green-500 font-semibold mt-1">
                        ₹{row.price}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDeleteExpance(row._id);
                      }}
                      className="text-red-500"
                    >
                      <BsXLg size={18} />
                    </button>
                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <div>
                      <p className="text-gray-400">
                        Category
                      </p>

                      <p>
                        {
                          row.expanceCategory
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Payment
                      </p>

                      <p>
                        {
                          row.paymentMethod
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Date
                      </p>

                      <p>
                        {new Date(row.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "2-digit",
                          month: "long",
                          day: "numeric",
                        })}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Notes
                      </p>

                      <p>{row.notes}</p>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <EmptyMessage label={text} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HiisabDashboard;