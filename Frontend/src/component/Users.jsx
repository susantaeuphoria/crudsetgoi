
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Users() {
  const [api, setapi] = useState([]);
  const [loading, setloading] = useState(true);

  const navigate = useNavigate();

  async function getapi() {
    try {
      const result = await axios.get("http://localhost:4500/");
      setapi(result.data.result || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setloading(false);
    }
  }

  const handelDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4500/delete/${id}`);

      // Update the UI without reloading the page
      setapi((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
    }
  };

  const handeledite = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    getapi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 px-4 py-10 sm:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Admin Dashboard
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              User Management
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage your users, edit their details, or remove accounts.
            </p>
          </div>

          <NavLink
            to="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="text-xl">+</span>
            Create User
          </NavLink>

        </div>

        {/* Stats Card */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                👥
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Users
                </p>
                <h2 className="text-2xl font-extrabold text-gray-800">
                  {api.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                ✅
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Dashboard Status
                </p>
                <h2 className="text-2xl font-extrabold text-emerald-600">
                  Active
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-xl shadow-indigo-100/60">

          <div className="flex flex-col gap-1 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              All Users
            </h2>

            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {api.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left">

              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email Address
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Number
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
                      <p className="text-sm text-gray-500">
                        Loading users...
                      </p>
                    </td>
                  </tr>
                ) : api.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="mb-3 text-4xl">📭</div>
                      <p className="font-semibold text-gray-700">
                        No users found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Create your first user to get started.
                      </p>
                    </td>
                  </tr>
                ) : (
                  api.map((users) => (
                    <tr
                      key={users._id}
                      className="transition-colors duration-200 hover:bg-indigo-50/60"
                    >

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-md">
                            {users.name?.charAt(0).toUpperCase()}
                          </div>

                          <span className="font-semibold text-gray-800">
                            {users.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {users.email}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {users.number}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">

                          <button
                            onClick={() => handeledite(users._id)}
                            className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 transition duration-200 hover:scale-105 hover:bg-amber-500 hover:text-white"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() => handelDelete(users._id)}
                            className="rounded-lg bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 transition duration-200 hover:scale-105 hover:bg-rose-600 hover:text-white"
                          >
                            🗑 Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-700">
                {api.length}
              </span>{" "}
              user records
            </p>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          User Management Dashboard · © 2026
        </p>

      </div>
    </div>
  );
}

export default Users;
