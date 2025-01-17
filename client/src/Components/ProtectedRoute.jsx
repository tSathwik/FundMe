import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    console.log("token", token);
    if (token) {
      const validateToken = async () => {
        try {
          const response = await fetch("http://localhost:3000/validate-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.status === 200 && data.success) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setIsAuthenticated(false);
        }
      };

      validateToken();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
