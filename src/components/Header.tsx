import React, { useState } from "react";
import { useProductsStore } from "../store";
import { useNavigate } from "react-router-dom";
import { ProductListType } from "../types/ProductListType";
import { BsPersonCircle } from "react-icons/bs";

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
    <div className="bg-white">
      <div className="border py-3 px-6">
        <div className="flex justify-between">
          <div
            onClick={() => navigate("/home")}
            className="flex items-center cursor-pointer"
          >
            <img
              className="w-full max-w-[40px] h-auto"
              src="https://www.svgrepo.com/show/258175/t-shirt-shirt.svg"
              alt="Logo Image"
            />
            <span className="ml-2 font-bold text-xl text-[#252C32] ">
              Kohaku
            </span>
          </div>
          {showSearchBar && (
            <>
              <div className="ml-6 flex flex-1 gap-x-3">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm focus:outline-none"
                  onChange={handleChange}
                  value={query}
                />
              </div>
            </>
          )}

          <div className="ml-2 flex">
            <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Favorites</span>
            </div>
            <div
              onClick={() => navigate("/cart")}
              className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                  {basketItems.length}
                </span>
              </div>
              <span className="text-sm font-medium">Cart</span>
            </div>
            <div
              onClick={() => navigate("/profile")}
              className="ml-2 flex cursor-pointer items-center gap-x-1 py-2 px-4 hover:bg-gray-100"
            >
              <BsPersonCircle />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-x-2 py-1 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Nepal</span>
          </div>
          <div className="flex gap-x-8">
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
              Men's Clothing
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
              Jewellery
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
              Women's Clothing
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
              Electronics
            </span>
          </div>
          {/* <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
            Becoma a seller
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
