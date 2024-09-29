import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NoPage from "./Pages/NoPage";
import Menu from "./Components/Menu";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Services from "./Components/Services";
import ScrollTop from "./Components/ScrollTop";
import DishInfo from "./Components/DishInfo";
import CartPage from "./Components/CartPage";
import Login from "./Login/login";
import Signup from "./Login/signup";
import UserDashboard from "./Dashboard/UserDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AddProductPage from "./Dashboard/AddProductPage";
import UpdateProductPage from "./Dashboard/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";

const App = () => {
  return (
    <MyState>
      {" "}
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/DishInfo/:id" element={<DishInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/UserDash"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/AdminDash"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/AddProduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/UpdateProduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
