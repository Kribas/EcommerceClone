import React, { SyntheticEvent, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { FiMapPin, FiMenu, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useProductsStore } from "../store";
import { useNavigate } from "react-router-dom";
import { ProductListType } from "../types/ProductListType";

const Header = () => {
  const basketItems = useProductsStore((state: any) => state.basketItems);
  const productData = useProductsStore((state: any) => state.productData);
  const getSearchedProduct = useProductsStore(
    (state: any) => state.getSearchedProduct
  );

  const [query, setQuery] = useState("");

  const showSearchBar = useProductsStore((state: any) => state.showSearchBar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const results = productData.filter((product: ProductListType) => {
      if (e.target.value === "") return productData;

      return (
        product.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.category.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    getSearchedProduct(results);
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center bg-gray-400 top-0 z-30 w-full px-2 py-4 sm:px-4 shadow-xl">
      <div onClick={() => navigate("/home")} className="mx-auto cursor-pointer">
        <h1 className="text-3xl font-bold">Kohaku</h1>
      </div>

      <div className="flex items-center">
        <div className="relative hidden sm:flex flex-grow rounded-md items-center h-10">
          {showSearchBar && (
            <>
              <input
                onChange={handleChange}
                value={query}
                className="p-2 h-full w-96 flex-grow flex-shrink rounded-md"
                type="search"
              />
              <div className="p-4 absolute -top-5 right-1">
                <FiSearch className="h-12" />
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="p-4 cursor-pointer relative"
        >
          <div className="absolute right-4 bg-yellow-400 rounded-lg w-4 text-center">
            {basketItems.length}
          </div>
          <FiShoppingCart className="h-11 w-12" />
        </div>
      </div>
    </div>
  );
};

export default Header;
