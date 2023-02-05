import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../store";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "react-query";
import { useProductData } from "../hooks/useProductData";
import loading from "../assets/loading.gif";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Header from "../components/Header";

interface ProductsType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetail = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useProductData(productId);

  const basketItems = useProductsStore((state: any) => state.basketItems);

  const setShowSearchBar = useProductsStore(
    (state: any) => state.setShowSearchBar
  );

  useEffect(() => {
    setShowSearchBar(false);
  }, []);

  const getTotal = basketItems.reduce(
    (total: number, item: ProductsType) => total + item.price,
    0
  );

  const addToBasket = useProductsStore((state: any) => state.addToBasket);

  const addItemToBasket = () => {
    addToBasket({
      id: data?.data.id,
      title: data?.data.title,
      price: data?.data.price,
      description: data?.data.description,
      category: data?.data.category,
      image: data?.data.image,
    });
  };

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <img src={loading} alt="Loading Gif" />;
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <main className="lg:flex max-w-screen-1xl mx-auto">
          <div className=" my-10 relative">
            <div className="absolute top-3 right-3 text-gray-400">
              {data?.data.category}
            </div>
            <Carousel
              infiniteLoop
              interval={5000}
              showThumbs={false}
              showIndicators={true}
              showStatus={false}
            >
              <div className="w-64 m-auto">
                <img className="object-fill" src={data?.data.image} />
              </div>
              <div className="w-64 m-auto">
                <img className="object-fill" src={data?.data.image} />
              </div>
              <div className="w-64 m-auto">
                <img className="object-fill" src={data?.data.image} />
              </div>
            </Carousel>
            <div className="bg-white shadow-lg mx-w-sm rounded overflow-hidden m-10 px-6 py-6">
              <p className="text-lg">{data?.data.description}</p>
            </div>
          </div>
          <div className="flex flex-col bg-white p-10 shadow-md w-full">
            <h1 className="mb-20 font-bold text-3xl">
              <small>$</small>
              {data?.data.price}
            </h1>
            <button
              onClick={addItemToBasket}
              className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 focus:outline-none focus:ring-yellow-500 active:from-yellow-500 rounded-lg w-full mb-10"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              role="link"
              className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 focus:outline-none focus:ring-yellow-500 active:from-yellow-500 rounded-lg w-full"
            >
              Checkout
            </button>
            <div className="mt-20">
              <h1 className="mb-20 font-bold text-3xl">
                SubTotal({basketItems.length}): <small>$</small>
                {getTotal.toFixed(2)}
              </h1>
              <button
                onClick={() => navigate("/cart")}
                className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 focus:outline-none focus:ring-yellow-500 active:from-yellow-500 rounded-lg w-full"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetail;
