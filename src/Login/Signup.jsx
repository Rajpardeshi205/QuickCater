import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { Button, Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import myContext from "../context/myContext";
import toast from "react-hot-toast";
import Loader from "../Components/Loader/Loader";

const Signup = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();
  const [usersignup, setUsersignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    if (
      usersignup.name === "" ||
      usersignup.email === "" ||
      usersignup.password === ""
    ) {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        usersignup.email,
        usersignup.password
      );

      const user = {
        name: usersignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: usersignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");

      await addDoc(userReference, user);

      setUsersignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>
      <div
        className="flex justify-center items-center min-h-screen p-4"
        style={{ backgroundImage: `url("./Images/about_bg.jpg")`, backgroundSize: "cover" }}
      >
        <div className="login_Form bg-white/30 backdrop-blur-2xl border border-white/20 p-6 md:p-8 text-black rounded-[45px] shadow-[20px_20px_15px_10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:shadow-[10px_10px_15px_5px_rgba(0,0,0,0.5)] hover:translate-y-[-5px] max-w-sm w-full">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-red-500">
              Signup
            </h2>
          </div>

          <div className="mb-3">
            <Input
              type="name"
              label="Full name"
              value={usersignup.name}
              onChange={(e) =>
                setUsersignup({ ...usersignup, name: e.target.value })
              }
              className="w-full"
              color="red"
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              label="Email Address"
              value={usersignup.email}
              onChange={(e) =>
                setUsersignup({ ...usersignup, email: e.target.value })
              }
              color="red"
              className="w-full"
            />
          </div>

          <div className="mb-5">
            <Input
              type="password"
              label="Password"
              value={usersignup.password}
              onChange={(e) =>
                setUsersignup({ ...usersignup, password: e.target.value })
              }
              color="red"
            />
          </div>

          <div className="mb-5">
            <Button
              type="button"
              onClick={userSignupFunction}
              className="bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Signup
            </Button>
          </div>

          <div>
            <h2 className="text-black">
              Have an account?{" "}
              <Link className="text-red-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
