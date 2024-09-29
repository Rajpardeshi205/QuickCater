import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import Layout from "../Components/Layout";
import AboutBg from "/Public/Images/about_bg.jpg";
import { useContext, useEffect, useState } from "react";
import myContext from "../context/myContext";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const categoryList = [
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
const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/AdminDash");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <Layout>
      <div
        className="flex justify-center items-center h-screen"
        style={{ backgroundImage: `url(${AboutBg})` }}
      >
        <div className="login_Form bg-transparent backdrop-blur-2xl rounded-[45px] shadow-[20px_20px_15px_10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:shadow-[10px_10px_15px_5px_rgba(0,0,0,0.5)] hover:translate-y-[-5px] px-8 py-6 border border-black  w-96">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-red-400 ">
              Update Dish
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

          <div className="mb-3">
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
              name="description"
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              label="Product Description"
              rows="5"
              color="red"
            ></Textarea>
          </div>

          <div className="mb-3">
            <button
              type="button"
              onClick={updateProduct}
              className="bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProductPage;
