import Layout from "../Components/Layout";
import AboutBg from "/Public/Images/about_bg.jpg";
import { useContext, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import myContext from "../context/myContext";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      console.log(users.user);

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users?.user?.uid)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let user;
        QuerySnapshot.forEach((doc) => (user = doc.data()));
        localStorage.setItem("users", JSON.stringify(user));
        setUserLogin({
          email: "",
          password: "",
        });
        toast.success("Login Successfully");
        setLoading(false);
        if (user.role === "user") {
          navigate("/UserDash");
        } else {
          navigate("/AdminDash");
        }
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  return (
    <Layout>
      <div
        className="flex justify-center items-center h-screen bg-cover"
        style={{ backgroundImage: `url(${AboutBg})` }}
      >
        <div className="flex justify-center relative top-20">
          {loading && <Loader />}
        </div>
        <div className="login_Form bg-white/30 backdrop-blur-2xl border border-white/20 p-8 text-black rounded-[45px] shadow-[20px_20px_15px_10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:shadow-[10px_10px_15px_5px_rgba(0,0,0,0.5)] hover:translate-y-[-5px] max-w-md w-full mx-4">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-red-500">
              Login
            </h2>
          </div>

          <div className="mb-3">
            <Input
              type="email"
              label="Email Address"
              value={userLogin.email}
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
              color="red"
            />
          </div>

          <div className="mb-5">
            <Input
              type="password"
              label="Password"
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
              color="red"
            />
          </div>

          <div className="mb-5">
            <Button
              type="button"
              onClick={userLoginFunction}
              className="bg-red-500 hover:bg-red-600 w-full text-white py-2 font-bold rounded-md"
            >
              Login
            </Button>
          </div>

          <div>
            <h2 className="text-black text-center">
              Don't Have an account{" "}
              <Link className="text-red-500 font-bold" to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
