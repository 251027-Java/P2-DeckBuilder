import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on auth pages
  const hide =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  if (hide) return null;

  const logout = () => {
    // Update these keys to match your auth storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white font-brand font-bold shadow-lg hover:opacity-90 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
