"use client"

import { useGetTotalBalanceQuery } from "@/app/store/api/balanceApi"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import {
  FiHome,
  FiPieChart,
  FiCreditCard,
  FiSettings,
  FiUploadCloud,
} from "react-icons/fi"
import { BiLoader } from "react-icons/bi"
import { useGetExpanceByIdQuery, useUpdateExpanceMutation, useGetThisMonthExpanceQuery, useGetThisYearExpanceQuery } from "@/app/store/api/expanceApi"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"


const EditPage = () => {

  let parms = useParams()
  let navigate = useRouter()
  let id = parms.id
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const { data: totalBalance, refetch } = useGetTotalBalanceQuery({})
  let [updateExpance, { data: updateData, isLoading: isUpdating, isError: isUpdateError, isSuccess: isUpdateSuccess, error: updateError }] = useUpdateExpanceMutation()
  let getExpanceById = useGetExpanceByIdQuery(id)
  let getThisMonthExpance = useGetThisMonthExpanceQuery({})
  let getThisYearExpance = useGetThisYearExpanceQuery({})

  const [formData, setFormData] = useState({
    item: "",
    price: "",
    expanceCategory: "",
    paymentMethod: "",
    date: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let form = new FormData()
    form.append("item", formData.item)
    form.append("price", formData.price)
    form.append("expanceCategory", formData.expanceCategory)
    form.append("paymentMethod", formData.paymentMethod)
    form.append("date", formData.date)
    form.append("notes", formData.notes)

    if (imageFile) {
      form.append("image", imageFile)
    }


    await updateExpance({ fromData: form, id })
  }


  useEffect(() => {
    if (getExpanceById?.data) {
      setFormData({
        item: getExpanceById?.data?.data?.item,
        price: getExpanceById?.data?.data?.price,
        expanceCategory: getExpanceById?.data?.data?.expanceCategory,
        paymentMethod: getExpanceById?.data?.data?.paymentMethod,
        date: getExpanceById?.data?.data?.date.split("T")[0],
        notes: getExpanceById?.data?.data?.notes,
      })
    }

    if (isUpdateSuccess && updateData) {
      toast.success(updateData.message)
      navigate.push("/hiisabdashboard")
      refetch()
    } else if (isUpdateError) {
      toast.error("Failed to Update Expance")
    }

  }, [isUpdateSuccess, isUpdateError, updateData, getExpanceById?.data])

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="min-h-screen bg-[#0B0F19] text-white flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] border-r border-white/10 bg-[#111827] flex-col p-6">

        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-yellow-400">
            Expensio
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Smart Edit to save more!
          </p>
        </div>

        <nav className="space-y-3">

          <button className="w-full flex items-center gap-3 bg-yellow-400 text-black px-4 py-3 rounded-xl font-semibold">
            <FiHome size={20} />
            Dashboard
          </button>

          <button onClick={()=> navigate.push("/hiisabdashboard/expense_chart")} className="w-full flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl text-gray-300 transition">
            <FiPieChart size={20} />
            Analytics
          </button>

          <button onClick={()=> navigate.push("/hiisabdashboard")} className="w-full flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl text-gray-300 transition">
            <FiCreditCard size={20} />
            Expenses
          </button>

        </nav>

        {/* Mini Card */}
        <div className="mt-auto bg-gradient-to-br from-yellow-400 to-yellow-500 p-5 rounded-2xl text-black shadow-xl">
          <p className="text-sm opacity-70">
            Available Balance
          </p>

          <h2 className="text-3xl font-extrabold mt-2">
            ₹ {totalBalance?.balance?.totalBalance || 0}
          </h2>

          <p className="text-xs mt-2 opacity-70">
            Your monthly financial overview
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">

        {/* Topbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Edit Expense
            </h1>

            <p className="text-gray-400 mt-2">
              Update your transaction details
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl">
            <p className="text-sm text-gray-400">
              Current Balance
            </p>

            <h2 className="text-2xl font-bold text-yellow-400">
              ₹ {totalBalance?.balance?.totalBalance || 0}
            </h2>
          </div>
        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="xl:col-span-2 bg-[#111827] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">

            <form className="space-y-7" onSubmit={(e) => handleSubmit(e)}>

              {/* Upload */}
              <label
                htmlFor="image"
                className="border-2 border-dashed border-yellow-400/40 hover:border-yellow-400 transition rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-white/5"
              >
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="preview"
                    width={240}
                    height={240}
                    className="rounded-2xl object-cover"
                  />
                ) : (
                  <>
                    {getExpanceById?.data?.data?.image ? (
                      <Image
                        src={getExpanceById?.data?.data?.image}
                        alt="Receipt"
                        width={230}
                        height={230}
                        className="rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="bg-yellow-400/20 p-5 rounded-full mb-4">
                        <FiUploadCloud
                          size={40}
                          className="text-yellow-400"
                        />
                      </div>
                    )}

                    <h2 className="font-semibold text-lg mt-2">
                      Upload Receipt
                    </h2>

                    <p className="text-gray-400 text-sm mt-2">
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
              </label>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Item Name
                  </label>

                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={changeHandler}
                    placeholder="Macbook Pro"
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={changeHandler}
                    placeholder="₹ 2500"
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Category
                  </label>

                  <select
                    name="expanceCategory"
                    value={formData.expanceCategory || getExpanceById?.data?.data?.expanceCategory}
                    onChange={changeHandler}
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="fruits">Fruits</option>
                    <option value="donations">Donations</option>
                    <option value="movies">Movies</option>
                    <option value="fast_foods">Fast Foods</option>
                    <option value="EMIs">EMIs</option>
                    <option value="transport">Transport</option>
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="shopping">Shopping</option>
                    <option value="shopping">Cloths</option>
                    <option value="bills">Bills</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Payment Method
                  </label>

                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod || getExpanceById?.data?.data?.paymentMethod}
                    onChange={changeHandler}
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Payment</option>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={changeHandler}
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={changeHandler}
                    placeholder="Additional details..."
                    className="w-full h-[110px] resize-none bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/30">
                {isUpdating ? <p className="flex item-center justify-center gap-2"><BiLoader className="animate-spin" size={22} /> Updating...</p> : "Update Expense"}
                
              </button>
            </form>
          </div>

          {/* Right Side Stats */}
          <div className="space-y-6">

            <div className="bg-[#111827] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400 text-sm">
                Monthly Spending
              </p>

              <h2 className="text-4xl font-bold mt-3 text-red-400">
                ₹ {getThisMonthExpance?.data?.data?.total || 0}
              </h2>

              <div className="w-full h-3 bg-white/10 rounded-full mt-5 overflow-hidden">
                <div className="w-[70%] h-full bg-red-400 rounded-full"></div>
              </div>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-3xl p-6">
              <p className="text-gray-400 text-sm">
                Yearly Spending
              </p>

              <h2 className="text-4xl font-bold mt-3 text-green-400">
                ₹ {getThisYearExpance?.data?.data?.total || 0}
              </h2>

              <div className="w-full h-3 bg-white/10 rounded-full mt-5 overflow-hidden">
                <div className="w-[82%] h-full bg-green-400 rounded-full"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-6 text-black shadow-2xl">
              <h2 className="text-2xl font-bold">
                Smart Tip 💡
              </h2>

              <p className="mt-3 text-sm opacity-80 leading-6">
                Try reducing unnecessary food delivery expenses
                this month to increase your savings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default EditPage