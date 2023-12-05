import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOutsideCall from "../../hooks/useOutsideCall";
import { useAuth } from "../Context/AuthContext";
import { BiUserCircle } from "react-icons/bi";

const navLinks = [
  { path: "/Your-Currency/", title: "home" },
  { path: "/Your-Currency/rates", title: "Rate's Page" },
  { path: "/Your-Currency/topCharts", title: "Top Charts" },
  { path: "/Your-Currency/search", title: "Search Coin's" },
];

function Navbar() {
  const [menuIsOpen, setMenuISOpen] = useState(false);
  const menuRef = useRef();
  const { isAuthenticated } = useAuth();

  useOutsideCall(menuRef, () => setMenuISOpen(false), "close-icon");

  return (
    <div className="container max-w-7xl m-auto">
      <div className="w-11/12 mx-auto bg-secondary-150 mt-4 lg:mt-6 p-3 border-secondary-200 border-[2px] rounded-3xl flex justify-between">
        {/* logo */}
        <div
          id="logo"
          className="sm:w-1/5 flex items-center justify-center sm:ml-4"
        >
          <Link
            to="/Your-Currency/"
            className="flex items-center justify-center gap-x-1 w-full sm:px-6"
          >
            <img
              src="./logo/logo.svg"
              alt="site-logo"
              className="hover:rotate-12 transition-transform"
            />
            <p className="text-white-90 font-semibold text-lg md:text-xl hidden sm:block transition-all hover:text-primary-100">
              YourCurrency
            </p>
          </Link>
        </div>
        {/* desktop menu */}
        <div
          id="desktop-menu"
          className="hidden sm:flex items-center w-full z-40
         "
        >
          <ul className="w-full flex items-center justify-center gap-x-2">
            {navLinks.map(({ path, title }) => {
              return (
                <Link
                  to={path}
                  key={`${path}-${Math.random()}`}
                  className="px-4 py-3 hover:bg-secondary-400 rounded-2xl transition-all"
                >
                  <li className="text-secondary-600 hover:text-white-90">
                    {title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        {/* profile */}
        <div
          id="profile"
          className="hidden sm:flex items-center justify-center"
        >
          <Link
            to={
              isAuthenticated
                ? "/Your-Currency/profile"
                : "/Your-Currency/logIn"
            }
            className="w-full h-full bg-primary-200 text-secondary-200 text-sm px-5 py-2 rounded-3xl hover:bg-primary-400 hover:text-secondary-300 transition-all text-center flex items-center"
          >
            {isAuthenticated ? (
              <span className="flex items-center justify-center gap-x-2">
                <BiUserCircle className="text-xl" /> Profile
              </span>
            ) : (
              <span>Login</span>
            )}
          </Link>
        </div>
        {/* moblie menu */}
        <div id="mobile-menu" className="sm:hidden relative ">
          <button
            onClick={() => setMenuISOpen(!menuIsOpen)}
            className="bg-primary-100 w-full h-full flex justify-center items-center px-3 py-1 rounded-3xl"
          >
            <svg
              id="close-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
            >
              <path
                fill="#333"
                fillRule="evenodd"
                d="M3.5 7.875c0-.483.392-.875.875-.875h19.25a.875.875 0 0 1 0 1.75H4.375a.875.875 0 0 1-.875-.875ZM3.5 14c0-.483.392-.875.875-.875h19.25a.875.875 0 0 1 0 1.75H4.375A.875.875 0 0 1 3.5 14Zm9.625 6.125c0-.483.392-.875.875-.875h9.625a.875.875 0 0 1 0 1.75H14a.875.875 0 0 1-.875-.875Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            ref={menuRef}
            className={`${
              menuIsOpen ? "flex" : "hidden"
            } bg-secondary-200 z-50 border-secondary-300 border-[1px] rounded-md absolute top-14 right-0 w-40 flex flex-col gap-y-4 px-2 py-4`}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ path, title }) => {
                return (
                  <Link key={`${path}-${Math.random}`} to={path}>
                    <li className="text-sm text-secondary-600 hover:text-white-100">
                      {title}
                    </li>
                  </Link>
                );
              })}
            </ul>
            <hr />
            <Link
              to={
                isAuthenticated
                  ? "/Your-Currency/profile"
                  : "/Your-Currency/logIn"
              }
              className="bg-primary-200 text-secondary-200 text-sm px-1 py-2 rounded-md hover:bg-primary-400 hover:text-secondary-300 transition-all text-center"
            >
              {isAuthenticated ? (
                <span className="flex items-center justify-center gap-x-2">
                  <BiUserCircle className="text-xl" /> Profile
                </span>
              ) : (
                <span>Login</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
