import { useState } from "react";
import { developerInfo } from "../../../constants";
import { Rating } from "@smastrom/react-rating";

import { FaLinkedinIn, FaTelegramPlane, FaTools } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { MdEngineering, MdOutlineMail } from "react-icons/md";

function IntroduceDeveloperSection() {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <div
      id="introduce_developer"
      className="container mx-auto 2xl:max-w-6xl py-20 px-5"
    >
      <h2 className="text-primary-100 hover:text-primary-200 transition-all text-xl text-center sm:text-left my-8 sm:my-4">
        About me :)
      </h2>
      <div
        id="wrapper"
        className="flex flex-col sm:flex-row sm:justify-center bg-secondary-200 rounded-xl"
      >
        <div className="flex justify-center sm:w-1/2 sm:p-0 relative -top-5 hover:-top-10 transition-all sm:top-0 duration-700 ease-in-out">
          <img
            src="./images/developerPic.jpg"
            alt="developer pic"
            className="object-cover rounded-md max-w-ful"
          />
        </div>
        <div className="sm:w-3/4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-y-4 mt-2 px-2 sm:px-4">
            <div className="sm:w-1/2 py-3">
              <ul>
                <li className="flex items-center gap-x-2 mb-2">
                  <IoPersonSharp className="text-primary-100 text-xl" />
                  <p className="font-semibold text-secondary-600 text-base">
                    20
                  </p>
                </li>
                <li className="flex items-center bg-red-20s0 gap-x-2 mb-2">
                  <MdEngineering className="text-primary-100 text-xl" />
                  <p className="font-semibold text-secondary-600 text-base whitespace-nowrap">
                    front End Developer
                  </p>
                </li>
                <li className="flex items-center gap-x-2">
                  <FaTools className="text-primary-100 text-xl" />
                  <p className="font-semibold text-secondary-600 text-base">
                    junior
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-y-1 py-1 sm:w-1/2">
              {developerInfo.skills.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between w-full items-center"
                  >
                    <p className="text-base sm:text-md text-secondary-600">
                      {skill.skillName}
                    </p>
                    <Rating
                      style={{ width: "7rem" }}
                      readOnly
                      value={skill.level}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="px-3 py-2">
            <p className="text-primary-100 font-bold py-2 text-xl hover:text-primary-300">
              Biography :
            </p>
            <p
              className={`text-base text-white-90 ${
                !showFullBio && "line-clamp-6"
              }`}
            >
              {developerInfo.bio}
            </p>
            <button
              className="text-primary-100"
              onClick={() => setShowFullBio((prev) => !prev)}
            >
              {showFullBio ? "less..." : "show more"}
            </button>
          </div>
          <div className="flex items-center justify-evenly py-4">
            <a href="https://www.linkedin.com/in/mohammadarab-frontend/">
              <FaLinkedinIn className="text-3xl text-primary-100 hover:-translate-y-2 transition-transform" />
            </a>
            <a href="mailto:mohammadreactjs@gmail.com?subject=New Project&body=Please send me a copy of your new program!">
              <MdOutlineMail className="text-3xl text-primary-100 hover:-translate-y-2 transition-transform" />
            </a>
            <a href="https://t.me/oldofdesert">
              <FaTelegramPlane className="text-3xl text-primary-100 hover:-translate-y-2 transition-transform" />
            </a>
            <a href="https://github.com/its-mohammad-js">
              <FiGithub className="text-3xl text-primary-100 hover:-translate-y-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroduceDeveloperSection;
