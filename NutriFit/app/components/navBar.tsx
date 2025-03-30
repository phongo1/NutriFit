import { NavLink, useLocation } from "react-router";
import logo from "../assets/logo.png";
import LoginButton from "./loginButton";

const NavBar = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-app-bg)] shadow-sm w-screen h-17">
      <div className="max-w-7xl mx-auto py-3 flex items-center align-center justify-between w-screen h-full px-12">
        <div className="flex items-center">
          <img src={logo} alt="NutriFit Logo" className="h-8 w-8 mr-2" />
          <NavLink className="text-xl font-semibold text-[var(--color-text)]" to="/" end>
            NutriFit
          </NavLink>
        </div>
        {/* only render login button on navbar if not on "login" page or "signup" page */}
        {!isAuthPage && <LoginButton />}
      </div>
    </nav>
  );
};

export default NavBar;
