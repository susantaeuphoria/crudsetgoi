import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [loading, setloading] = useState(true);
  const [saving, setsaving] = useState(false);

  const { myid } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await axios.get(
        `https://crudsetgoi.onrender.com/update/${myid}`
      );

      setname(result.data.result.name);
      setemail(result.data.result.email);
      setnumber(result.data.result.number);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setloading(false);
    }
  };

  const handelForm = async (e) => {
    e.preventDefault();

    try {
      setsaving(true);

      const result = await axios.put(
        `https://crudsetgoi.onrender.com/update/${myid}`,
        { name, email, number }
      );

      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    } finally {
      setsaving(false);
    }
  };

  useEffect(() => {
    getData();
  }, [myid]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-8">

      <div className="w-full max-w-lg rounded-3xl border border-white bg-white/90 p-6 shadow-2xl shadow-indigo-200/60 backdrop-blur transition-all duration-300 sm:p-10">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl text-white shadow-lg shadow-indigo-200">
            ✏️
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
            Update Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Edit your information and save your changes.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        </div>

        {/* Form */}
        <form onSubmit={handelForm} className="space-y-5">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
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
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
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
            <label
              htmlFor="number"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="number"
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

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-3 sm:flex-row">

            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "✓ Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>

        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-xs text-gray-400">
          Make sure your information is correct before saving.
        </p>

      </div>
    </div>
  );
}

export default Update;
