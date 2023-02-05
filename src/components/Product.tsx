import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface ProductsType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Product: React.FC<ProductsType> = ({
  id,
  title,
  price,
  description,
  category,
  image,
}) => {
  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING)) + MIN_RATING
  );

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="relative bg-white shadow-lg mx-w-sm rounded overflow-hidden m-10 px-6 py-4 cursor-pointer"
    >
      <p className="absolute top-2 right-2 text-gray-400">{category}</p>
      <div className="mt-8 m-auto">
        <img
          className="fill w-56 object-contain"
          src={image}
          alt="Product Image"
        />
      </div>
      <h4 className="my-3 text-xl font-bold">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(rating)
          .map((_, i) => {
            return (
              <div key={i}>
                <AiFillStar className="h-5 text-yellow-500" />
              </div>
            );
          })}
      </div>
      <div className="mb-5">
        <small>$</small>
        <strong>{price}</strong>
      </div>
      <p className="text-xs line-clamp-2">{description}</p>
    </div>
  );
};

export default Product;
