import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ADMIN") {
        navigate("/"); // Redirect to regular home if not admin
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome to Admin Panel
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Admin Cards/Stats */}
            <div className="bg-emerald-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-emerald-800">Users</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">124</p>
              <p className="mt-1 text-sm text-gray-600">Total registered users</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-blue-800">Products</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">56</p>
              <p className="mt-1 text-sm text-gray-600">Total products</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-purple-800">Orders</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">24</p>
              <p className="mt-1 text-sm text-gray-600">New orders today</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/a-users")}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Manage Users
              </button>
              <button
                onClick={() => navigate("/a-products")}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Manage Products
              </button>
              <button
                onClick={() => navigate("/a-orders")}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate("/a-settings")}
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;