import { useState, useEffect } from "react";
import api from "../API";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const res = await api.post("/refresh", { refresh_token: refreshToken });
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
        console.log('New Access Token:', res.data.access_token); // Enhanced logging
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        console.error("Error refreshing token:", res.data);
      }
    } catch (error) {
      console.error("Error in refresh token request:", error); // Enhanced logging
      setIsAuthenticated(false);
    }
  };

  const authenticate = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded); // Enhanced logging
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Render a loading state while authentication is in progress
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
