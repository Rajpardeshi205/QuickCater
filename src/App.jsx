import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Use HashRouter
import HomePage from "/src/Pages/HomePage";
import NoPage from "/src/Pages/NoPage";
import Menu from "/src/Components/Menu";
import About from "/src/Components/About";
import Contact from "/src/Components/Contact";
import Services from "/src/Components/Services";
import ScrollTop from "/src/Components/ScrollTop";
import DishInfo from "/src/Components/DishInfo";
import CartPage from "/src/Components/CartPage";
import Login from "/src/Login/Login";
import Signup from "/src/Login/Signup";
import UserDashboard from "/src/Dashboard/UserDashboard";
import AdminDashboard from "/src/Dashboard/AdminDashboard";
import AddProductPage from "/src/Dashboard/AddProductPage";
import UpdateProductPage from "/src/Dashboard/UpdateProductPage";
import MyState from "/src/context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "/src/protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "/src/protectedRoute/ProtectedRouteForUser";

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
