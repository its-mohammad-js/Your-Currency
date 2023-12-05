import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

// eslint-disable-next-line react/prop-types
function AppLAyout({ children }) {
  return (
    <>
      <div className="absolute left-[-15px] top-0 sm:w-1/3 z-[-1]">
        <img
          src="./images/Abstract Design.svg"
          className="object-coontain w-full h-full animate-fade-in"
          alt="Abstract"
        />
      </div>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default AppLAyout;
