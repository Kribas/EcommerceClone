import React, { useEffect } from "react";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import { useProductsStore } from "../store";

interface BasketItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const CartPage = () => {
  const basketItems = useProductsStore((state: any) => state.basketItems);

  const setShowSearchBar = useProductsStore(
    (state: any) => state.setShowSearchBar
  );

  useEffect(() => {
    setShowSearchBar(false);
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <main className="lg:flex max-w-screen-2xl mx-auto">
          <div className="flex-grow m-5 shadow-sm">
            <div className="flex flex-col p-5 space-y-10 bg-white">
              {basketItems.length === 0 ? (
                <h1 className="text-3xl">Your Cart is Empty</h1>
              ) : (
                <h1 className="text-3xl">Shopping Basket</h1>
              )}
              {basketItems.map((basketItem: BasketItemType) => (
                <CartItem
                  id={basketItem.id}
                  title={basketItem.title}
                  price={basketItem.price}
                  description={basketItem.description}
                  category={basketItem.category}
                  image={basketItem.image}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CartPage;
