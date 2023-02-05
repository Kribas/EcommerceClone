import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useProductsStore } from "../store";
import Product from "./Product";
import loading from "../assets/loading.gif";
import { useProductsQuery } from "../hooks/useProductsQuery";
import axios from "axios";
import { ProductListType } from "../types/ProductListType";
import Cookies from "universal-cookie";
import Header from "./Header";

const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

const ProductList = () => {
  const getProductData = useProductsStore((state: any) => state.getProductData);
  const productData = useProductsStore((state: any) => state.productData);
  const searchedProduct = useProductsStore(
    (state: any) => state.searchedProduct
  );
  const getSearchedProduct = useProductsStore(
    (state: any) => state.getSearchedProduct
  );

  const setShowSearchBar = useProductsStore(
    (state: any) => state.setShowSearchBar
  );

  useEffect(() => {
    setShowSearchBar(true);
  }, []);

  const { data, isLoading } = useQuery(
    "products-data",
    async () => {
      return await axios.get("https://fakestoreapi.com/products");
    },
    {
      onSuccess(data) {
        getProductData(data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <img src={loading} alt="Loading Gif" />;
        </div>
      </>
    );
  }

  const logOut = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {searchedProduct.map((product: ProductListType) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
      <button
        onClick={() => logOut()}
        className="bg-red-600 text-white"
        type="submit"
      >
        Logout
      </button>
    </>
  );
};

export default ProductList;
