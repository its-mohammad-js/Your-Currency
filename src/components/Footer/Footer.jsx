import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

function Footer() {
  return (
    <div className="container 2xl:max-w-6xl mx-auto">
      <div id="wrapper" className="bg-secondary-200 py-4">
        <div className="">
          <Link
            to="/Your-Currency"
            className="flex items-center justify-center gap-x-1 w-full sm:px-6"
          >
            <img
              src="./logo/logo.svg"
              alt="logo-site"
              className="hover:rotate-12 transition-transform"
            />
            <p className="text-white-90 font-semibold text-lg md:text-xl transition-all hover:text-primary-100">
              YourCurrency
            </p>
          </Link>
        </div>
        <div className="sm:flex w-full justify-evenly sm:px-6">
          <div className="flex flex-col gap-y-3 justify-center items-center my-4">
            <p className="flex items-center gap-x-1">
              <FaPhone className="text-primary-100 text-xl" />
              <span className="text-white-90 text-base">
                mohammadreactjs@gmail.com
              </span>
            </p>
            <p className="flex items-center gap-x-1 text-base sm:text-lg">
              <MdOutlineMail className="text-primary-100 text-xl" />
              <span className="text-white-90 text-base">+98-9396356829</span>
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-4/5 sm:w-full bg-secondary-100 border-2 border-secondary-600 border-opacity-50 p-4 rounded-lg my-2 flex flex-col gap-6">
              <p className="text-secondary-600 text-sm text-center whitespace-nowrap">
                YourBank All Rights Reserved
              </p>
              <div className="">
                <span className="text-secondary-600 text-sm float-left">
                  Privacy Policy
                </span>
                <span className="text-secondary-600 text-sm float-right">
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
