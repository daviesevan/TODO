import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

const Router = () => {
  function logout(){
    localStorage.clear()
    return <Navigate to="/login"/>
  }

  function RegisterAndLogout(){
    localStorage.clear()
    return <SignupPage />
  }
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterAndLogout />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* Add your other routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Router;
