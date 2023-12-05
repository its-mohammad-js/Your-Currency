import AppLAyout from "./layout/AppLAyout";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import CoinsContext from "./components/Context/CoinsContext";
import RatesPage from "./pages/RateTablePage/RatesPage";
import TopCartsPage from "./pages/TopChartsPage/TopCartsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import SingleCoinPage from "./pages/SingleCoinPage/SingleCoinPage";
import AuthContext from "./components/Context/AuthContext";
import LogInPage from "./pages/AuthecticationPage/LogInPage";
import SignUpPage from "./pages/AuthecticationPage/SignUpPage";
import ProfilePage from "./pages/Profilepage/ProfilePage";

function App() {
  return (
    <>
      <AuthContext>
        <CoinsContext>
          <Toaster />
          <AppLAyout>
            <Routes>
              <Route path="/Your-Currency/" element={<HomePage />} />
              <Route path="/Your-Currency/rates" element={<RatesPage />} />
              <Route
                path="/Your-Currency/topCharts"
                element={<TopCartsPage />}
              />
              <Route path="/Your-Currency/search" element={<SearchPage />} />
              <Route
                path="/Your-Currency/singleCoin/:id"
                element={<SingleCoinPage />}
              />
              <Route path="/Your-Currency/logIn" element={<LogInPage />} />
              <Route path="/Your-Currency/signUp" element={<SignUpPage />} />
              <Route path="/Your-Currency/profile" element={<ProfilePage />} />
            </Routes>
          </AppLAyout>
        </CoinsContext>
      </AuthContext>
    </>
  );
}

export default App;
