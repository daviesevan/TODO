import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const FormComponent = ({ route, method }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, formData);
      if (method === "Login") {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        navigate('/dashboard')
        // setTimeout(() => {
        //   navigate("/dashboard");
        //   console.log("===============Dashboard hit=================");
        // }, 500);
      } else {
        if (res.data.error === "Email already exists") {
          toast.error("Ooops! Email already exists!");
        } else {
          toast.success("Account created successfully");
          navigate("/login");
        }
      }
    } catch (error) {
      setError('Incorrect email or password!')
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-sm mt-10 mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            {method === "Login" ? "Welcome Back" : "Hello new user!"}
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            {method === "Login"
              ? "Login to your account!"
              : "We welcome you to the family!"}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <label htmlFor="email" className="block text-sm text-gray-500 dark:text-gray-300">Email Address</label>
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </div>
            <div className="w-full mt-4">
              <label htmlFor="password" className="block text-sm text-gray-500 dark:text-gray-300">Password</label>
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
              />
              {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
            </div>
            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          {method === "Login" ?
          <> 
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?{" "}
          </span>
          <Link
            to="/signup"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
          </>
          : 
          <> 
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Sign In
          </Link>
          </>
          } 
        </div>
      </div>
    </>
  );
};

export default FormComponent;
