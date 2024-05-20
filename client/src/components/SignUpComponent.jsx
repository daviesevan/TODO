import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData
      );
      console.log(response.data);
      setIsSubmitted(true);
      setError("");
      navigate("/login");
    } catch (err) {
      toast.error("This didn't work. Please Try Again!");
      setError(err.response.data.error);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setFormData({ email: "", password: "", firstName: "", lastName: "" });
    }
  }, [isSubmitted]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full mt-6 max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="lastName" className="block font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpComponent;
