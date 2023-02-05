import React from "react";
import { useProductsStore } from "../store";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
}) => {
  const removeFromBasket = useProductsStore(
    (state: any) => state.removeFromBasket
  );

  const removeItemFromBasket = () => {
    removeFromBasket({ id: id });
  };

  return (
    <div className="lg:grid grid-cols-5">
      <div className="w-64">
        <img className="object-fill" src={image} alt="Cart Product Image" />
      </div>
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <p className="text-xs line-clamp-3 my-2">{description}</p>
        <div>
          <p className="text-gray-400">{category}</p>
        </div>
        <h1 className="text-3xl font-bold">
          <small>$</small>
          {price}
        </h1>
      </div>
      <div>
        <button
          onClick={removeItemFromBasket}
          className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 focus:outline-none focus:ring-yellow-500 active:from-yellow-500 rounded-lg mt-auto"
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CartItem;
