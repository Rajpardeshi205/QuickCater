import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { Card, Typography } from "@material-tailwind/react";
import myContext from "../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const Menu = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(getAllProduct.map((dish) => dish.category))];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    const sanitizedItem = { ...item };
    delete sanitizedItem.time;
    dispatch(addToCart(sanitizedItem));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    const sanitizedItem = { id: item.id };
    dispatch(deleteFromCart(sanitizedItem));
    toast.success("Delete cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout className="z-50">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-4">
        <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-2xl shadow-red-700">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-4 text-center text-4xl"
          >
            Categories
          </Typography>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category)}
              className="w-full p-2 text-left hover:bg-gray-200 rounded-lg"
            >
              {category}
            </button>
          ))}
        </aside>

        <Card className="static w-full md:w-3/4 p-6 h-auto z-1 shadow-lg">
          {selectedCategory ? (
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-4 text-center"
              >
                {selectedCategory}
              </Typography>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAllProduct
                  .filter((dish) => dish.category === selectedCategory)
                  .map((item) => {
                    const { id, title, price, productImageUrl } = item;

                    return (
                      <div
                        key={id}
                        className="border p-4 rounded-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-red-700 hover:bg-red-800 text-blue-gray-600 hover:text-white"
                      >
                        <img
                          onClick={() => navigate(`/Dishinfo/${id}`)}
                          src={productImageUrl}
                          alt={title}
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <Typography
                          variant="h6"
                          className="transition-colors duration-300"
                        >
                          {title}
                        </Typography>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">₹ {price}</span>
                        </div>
                        <div className="flex justify-center">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="text-gray-100 bg-yellow-600 border border-yellow-600 hover:bg-yellow-100 hover:text-yellow-600 w-full h-10 py-[4px] mt-4 rounded-lg font-bold"
                            >
                              Delete From Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="text-gray-100 bg-yellow-600 border border-yellow-600 hover:bg-yellow-100 hover:text-yellow-600 w-full h-10 py-[4px] mt-4 rounded-lg font-bold"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-center text-3xl"
            >
              Please select a category to view dishes.
            </Typography>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Menu;
