
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");

  const navigate = useNavigate();

  const handelForm = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://crudsetgoi.onrender.com/create",
        { name, email, number }
      );

      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-indigo-200/70 sm:p-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl text-white shadow-lg shadow-indigo-200">
            ✨
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handelForm} className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="example@gmail.com"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="number"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl active:translate-y-0"
          >
            Create Account
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 Your App. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default Create