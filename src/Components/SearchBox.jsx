import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../context/myContext";

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const [search, setSearch] = useState("");
  const filterSearchData = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search))
    .slice(0, 8);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 placeholder-gray-400 rounded-lg px-4 py-2 w-full max-w-md outline-none text-black"
        />
      </div>

      <div className="flex justify-center">
        {search && (
          <div className="absolute bg-gray-200 w-full max-w-md z-50 my-1 rounded-lg shadow-lg">
            {filterSearchData.length > 0 ? (
              filterSearchData.map((item, index) => (
                <div
                  key={index}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-300"
                  onClick={() => navigate(`/productinfo/${item.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <img className="w-10" src={item.productImageUrl} alt="" />
                    {item.title}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center py-2">
                <img
                  className="w-20"
                  src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                  alt="img"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
