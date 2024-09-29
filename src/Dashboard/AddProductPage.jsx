import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import Layout from "../Components/Layout";
import AboutBg from "/Public/Images/about_bg.jpg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

import myContext from "../context/myContext";
import toast from "react-hot-toast";
import Loader from "../Components/Loader/Loader";

const categoryList = [
  {
    name: "",
  },
  {
    name: "North Indian Catering",
  },
  {
    name: "Chinese Catering",
  },
  {
    name: "Italian Catering",
  },
  {
    name: "South Indian Catering",
  },
  {
    name: "Barbecue Catering",
  },
  {
    name: "Desserts Catering",
  },
  {
    name: "Korean Catering",
  },
];
const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === "" ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/AdminDash");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="flex justify-center items-center h-screen"
        style={{ backgroundImage: `url(${AboutBg})` }}
      >
        {loading && <Loader />}

        <div className="login_Form bg-transparent backdrop-blur-2xl rounded-[45px] shadow-[20px_20px_15px_10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:shadow-[10px_10px_15px_5px_rgba(0,0,0,0.5)] hover:translate-y-[-5px] px-8 py-6 border border-black  w-96">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-red-500 ">
              Add Dish
            </h2>
          </div>

          <div className="mb-3">
            <Input
              type="text"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              label="Dish Name"
              color="red"
            />
          </div>

          <div className="mb-3">
            <Input
              type="number"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              label="Dish Price"
              color="red"
            />
          </div>

          <div className="mb-3">
            <Input
              type="text"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              label="Dish Image Url"
              color="red"
            />
          </div>

          <div className="mb-3 text-black">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-3 py-2 bg-transparent border border-gray-400 rounded-md outline-none focus:border-2 focus:border-red-500"
              style={{ color: "#607d8b" }}
              onFocus={(e) => (e.target.style.color = "red")}
              onBlur={(e) => (e.target.style.color = "#607d8b")}
            >
              <option disabled>Select Dish Cuisines</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    style={{ borderColor: "#607d8b" }}
                    className="first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <Textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              label="Product Description"
              rows="5"
              color="red"
            ></Textarea>
          </div>

          <div className="mb-3">
            <button
              onClick={addProductFunction}
              type="button"
              className="bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProductPage;
