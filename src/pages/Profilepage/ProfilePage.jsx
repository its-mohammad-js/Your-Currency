import { BiArrowBack, BiHome, BiUserCircle } from "react-icons/bi";
import { useAuth } from "../../components/Context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LastPositions from "../../components/LastPositions/PositionCard";

function ProfilePage() {
  const { userData, positionsData, isAuthenticated, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/Your-Currency/");
  }, []);

  if (userData && isAuthenticated)
    return (
      <div className="container mx-auto 2xl:max-w-6xl">
        <div
          id="wrapper"
          className="flex flex-col gap-y-4 px-2 py-1 md:w-3/5 md:mx-auto md:py-4"
        >
          {/*  user data */}
          <div className="bg-secondary-300 px-2 py-1 rounded-md flex flex-col items-center">
            <span className="text-8xl text-primary-100">
              <BiUserCircle />
            </span>

            <p className="text-white-100">
              <strong>Email:</strong>
              <span>&nbsp;{userData.email}</span>
            </p>

            <div className="w-full flex items-center justify-between md:justify-evenly my-4">
              <button
                onClick={() => {
                  logOutUser();
                  navigate("/Your-Currency/");
                }}
                className="bg-secondary-100 px-4 py-2 text-white-100 rounded-md flex items-center justify-center gap-x-1"
              >
                <BiArrowBack /> Log out
              </button>
              <button
                onClick={() => navigate("/Your-Currency/")}
                className="bg-primary-100 px-4 py-2 text-secondary-100 rounded-md flex items-center justify-center gap-x-1"
              >
                Home page <BiHome />
              </button>
            </div>
          </div>
          {/* last position's */}
          <LastPositions
            positionsData={positionsData}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    );
}

export default ProfilePage;
