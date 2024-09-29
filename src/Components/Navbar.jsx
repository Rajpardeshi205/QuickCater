import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user && user.name) {
      console.log(`Welcome, ${user.name}`);
    }
  }, [user]);

  const logout = () => {
    if (user && user.name) {
      console.log(`Logging out, ${user.name}`);
    }
    localStorage.clear("users");
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:space-x-5 text-black text-md px-5 font-medium">
      <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
        <Link to={"/Menu"}>MENU</Link>
      </li>
      <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
        <Link to={"/About"}>ABOUT</Link>
      </li>
      <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
        <Link to={"/"}>HOME</Link>
      </li>
      <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
        <Link to={"/Services"}>SERVICES</Link>
      </li>
      <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
        <Link to={"/Contact"}>CONTACT</Link>
      </li>
      {user?.role === "user" && (
        <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
          <Link to={"/UserDash"}>{user.name}</Link>
        </li>
      )}
      {user?.role === "admin" && (
        <li className="hover:text-white hover:bg-black py-1 px-3 rounded-full transition-colors duration-200">
          <Link to={"/AdminDash"}>Admin</Link>
        </li>
      )}
    </ul>
  );

  return (
    <nav className="bg-red-800 z-50 sticky top-0">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center py-3 lg:px-3">
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-black text-2xl text-center">
              QuickCater
            </h2>
          </Link>
        </div>

        <div className="lg:hidden">
          <Button
            className="bg-red-800 hover:bg-red-400 text-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Menu
          </Button>
        </div>

        <div
          className={`right ${isMobileMenuOpen ? "block" : "hidden"} lg:block`}
        >
          {navList}
        </div>

        <div className="flex items-center px-5 space-x-4 font-medium">
          {!user ? (
            <Link to={"/Login"}>
              <Button className="bg-red-800 hover:bg-red-400 text-lg">
                Login
              </Button>
            </Link>
          ) : (
            ""
          )}
          {user && (
            <Button
              className="bg-red-800 hover:bg-red-400 text-lg"
              onClick={logout}
            >
              LogOut
            </Button>
          )}
          <Link to={"/cart"} className="text-black font-medium">
            Cart({cartItems.length})
          </Link>
          <SearchBox />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
