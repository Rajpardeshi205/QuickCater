import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import myContext from "../context/myContext";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import Loader from "./Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState(null);

  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productDoc = await getDoc(doc(fireDB, "products", id));
      setProduct({ id: productDoc.id, ...productDoc.data() });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const isInCart = cartItems.some((item) => item.id === id);

  const handleAddToCart = (item) => {
    if (!isInCart) {
      dispatch(addToCart(item));
      toast.success("Added to cart");
    }
  };

  const handleRemoveFromCart = (item) => {
    if (isInCart) {
      dispatch(deleteFromCart({ id: item.id }));
      toast.success("Removed from cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (loading || !product) {
    return <Loader />;
  }

  const stars = [1, 2, 3, 4, 5];

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <img
                className="w-full lg:h-[39em] rounded-lg"
                src={product.productImageUrl}
                alt={product.title}
              />
            </div>

            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6">
                  <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {product.title}
                  </h2>

                  <div className="flex items-center mb-6">
                    <ul className="flex mb-4 mr-2 lg:mb-0">
                      {stars.map((_, index) => (
                        <li key={index}>
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="w-4 mr-1 text-red-500 dark:text-gray-400"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                            </svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>₹ {product.price}</span>
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Description:
                  </h2>
                  <p>{product.description}</p>
                </div>

                {isInCart ? (
                  <button
                    className="text-gray-100 bg-yellow-600 border border-yellow-600 hover:bg-yellow-100 hover:text-yellow-600 w-full h-10 py-[4px] mt-4 rounded-lg font-bold"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Delete from Cart
                  </button>
                ) : (
                  <button
                    className="text-gray-100 bg-yellow-600 border border-yellow-600 hover:bg-yellow-100 hover:text-yellow-600 w-full h-10 py-[4px] mt-4 rounded-lg font-bold"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
