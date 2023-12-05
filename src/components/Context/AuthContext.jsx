import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

const AuthContextProvider = createContext();

function AuthContext({ children }) {
  //  get user status from auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // user main information's
  const [userData, setUserData] = useState(null);
  // get user data from local storage
  const userLocal = JSON.parse(localStorage.getItem("userData"));
  //  get saved positon's from local storage
  const userPos = JSON.parse(localStorage.getItem("userPositions"));

  const [positionsData, setPositionsData] = useState([]);

  // check local stoarge on mount
  useEffect(() => {
    if (userLocal) {
      setUserData(userLocal);
      setIsAuthenticated(true);
    }

    if (userPos) {
      setPositionsData(userPos);
    }
  }, []);

  // save position data in local storage
  useEffect(() => {
    localStorage.setItem("userPositions", JSON.stringify(positionsData));
  }, [positionsData]);

  //  save user data
  function authUser(user) {
    // set user data
    setUserData(user);
    // set is Authenticated
    setIsAuthenticated(true);

    // success message
    toast.success("successfully logged in");

    // set user data to local storage
    if (user.remember && !userLocal)
      localStorage.setItem("userData", JSON.stringify(user));
  }

  // log out user and  delete data
  function logOutUser() {
    // change app states
    setIsAuthenticated(false);
    setUserData(null);

    // clear local storage
    localStorage.removeItem("userData");
    localStorage.removeItem("userPositions");
  }

  // add new position
  function saveNewPos(posData) {
    setPositionsData((prev) => [...prev, posData]);
  }

  // delete postion
  function deletePosition(posId) {
    // create new array without selected position
    const newPositions = positionsData.filter(
      (pos) => pos.positionId !== posId
    );
    // set new array
    setPositionsData(newPositions);
  }

  return (
    <AuthContextProvider.Provider
      value={{
        isAuthenticated,
        authUser,
        userData,
        positionsData,
        saveNewPos,
        deletePosition,
        logOutUser,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContextProvider);
};
