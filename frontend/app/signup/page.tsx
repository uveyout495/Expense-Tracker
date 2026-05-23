"use client"

import React, { useEffect, useState } from "react";
import {
    IoMailOutline,
    IoLockClosedOutline,
    IoPersonOutline,
    IoCheckmarkDoneCircle
} from "react-icons/io5";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { USER_ENDPOINT, useRegisterUserMutation } from "../store/api/userApi";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

const Signup = () => {

    let navigate = useRouter()

    let [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    
    let [showVerifyUI, setShowVerifyUI] = useState(false)

    let changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    let [
        registerUser,
        {
            data: registerData,
            isLoading: registerIsLoading,
            error: registerError,
            isError: registerIsError,
            isSuccess: registerIsSuccess
        }
    ] = useRegisterUserMutation()

    let submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await registerUser({ formData })
        console.log(registerData)
    }

    const handelGoogleLogin = async () => {
        try {
            navigate.push(`${USER_ENDPOINT}/google`)
        } catch (error) {
            console.log(error)
            toast.error("Email or Password is Incorrent")
        }
    }

    useEffect(() => {

        if (registerIsSuccess) {

            toast.success(
                registerData?.message ||
                "User Register Successfully Please check your email Address for verification"
            )

            // 👇 SHOW SUCCESS UI
            setShowVerifyUI(true)
        }

        if (registerIsError) {

            toast.error(
                (registerError as any)?.data?.message ||
                "Registration failed"
            );
        }

    }, [registerIsSuccess, registerIsError, registerData])



    if (showVerifyUI) {
        return (
            <div className="min-h-screen w-full flex items-center p-7 justify-center px-4 overflow-hidden relative">

                {/* Glow Effects */}
                <div className="absolute top-[-100px] left-[-100px] h-72 w-72 bg-yellow-400/20 blur-3xl rounded-full"></div>

                <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 bg-blue-500/20 blur-3xl "></div>

                {/* Card */}
                <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8 md:p-10 text-center">

                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="relative">

                            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-30 rounded-full"></div>

                            <div className="relative h-24 w-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40">
                                <IoCheckmarkDoneCircle className="text-white text-6xl" />
                            </div>

                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-8 text-4xl font-extrabold text-white tracking-tight">
                        Email Sent
                    </h1>

                    <p className="mt-4 text-gray-300 text-base leading-relaxed">
                        We’ve successfully sent a verification link to your email address.
                    </p>

                    {/* Email */}
                    <div className="mt-5 flex items-center justify-center gap-2 text-yellow-400 font-medium bg-yellow-400/10 border border-yellow-400/20 rounded-xl py-3 px-4">
                        <HiOutlineMail className="text-xl" />
                        {formData.email}
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 text-left">

                        <p className="text-sm text-gray-300 leading-6">
                            Please check your inbox and click the verification
                            link to activate your account.
                        </p>

                        <ul className="mt-3 text-sm text-gray-400 space-y-1">
                            <li>• Check spam/promotions folder</li>
                            <li>• Link may expire in a few minutes</li>
                            <li>• Make sure email address is correct</li>
                        </ul>

                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">

                        {/* Login */}
                        <button
                            onClick={() => navigate.push("/login")}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-yellow-500/20"
                        >
                            Back to Login
                        </button>

       
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-xs text-gray-500">
                        Didn’t receive anything? Wait a minute and try again.
                    </p>

                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 px-4">


            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">

                <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
                    Create Account
                </h1>

                <p className="text-gray-400 text-center mb-6 text-sm">
                    Start managing your expenses easily
                </p>


                <button
                    onClick={handelGoogleLogin}
                    className="flex items-center justify-center gap-3 w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>


                <div className="flex items-center gap-2 my-5">

                    <div className="flex-1 h-px bg-gray-600"></div>

                    <p className="text-gray-400 text-xs">OR</p>

                    <div className="flex-1 h-px bg-gray-600"></div>

                </div>


                <form
                    className="flex flex-col gap-4"
                    onSubmit={submitHandler}
                >

                    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">

                        <IoPersonOutline
                            className="text-gray-400"
                            size={20}
                        />

                        <input
                            type="text"
                            name="fullName"
                            onChange={changeHandler}
                            placeholder="Full Name"
                            className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
                        />

                    </div>


                    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">

                        <IoMailOutline
                            className="text-gray-400"
                            size={20}
                        />

                        <input
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Email Address"
                            className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
                        />

                    </div>


                    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">

                        <IoLockClosedOutline
                            className="text-gray-400"
                            size={20}
                        />

                        <input
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            placeholder="Password"
                            className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
                        />

                    </div>


                    <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">

                        <IoLockClosedOutline
                            className="text-gray-400"
                            size={20}
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={registerIsLoading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                        {registerIsLoading && (
                            <BiLoader className="animate-spin text-lg" />
                        )}

                        {registerIsLoading
                            ? "Signing Up..."
                            : "Sign Up"}

                    </button>

                </form>


                <p className="text-center text-gray-400 text-sm mt-5">

                    Already have an account?{" "}

                    <span
                        onClick={() => navigate.push("/login")}
                        className="text-yellow-400 cursor-pointer hover:underline"
                    >
                        Login
                    </span>

                </p>
            </div>
        </div>
    );
};

export default Signup;