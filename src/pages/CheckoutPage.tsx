import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useProductsStore } from "../store";
import { ProductListType } from "../types/ProductListType";
import Header from "../components/Header";

const CheckoutPage = () => {
  const basketItems = useProductsStore((state: any) => state.basketItems);
  const setShowSearchBar = useProductsStore(
    (state: any) => state.setShowSearchBar
  );

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState<boolean>();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      ?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate("/");
      });
  };

  const handleChange = (e: any) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  useEffect(() => {
    setShowSearchBar(false);
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getTotal * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basketItems]);

  const getTotal = basketItems.reduce(
    (total: number, item: ProductListType) => total + item.price,
    0
  );
  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="payment__container">
          <h1 className="text-2xl font-normal text-center p-[10px] bg-slate-300 border-b-[1px] border-gray-300">
            Checkout (<Link to="/checkout">{basketItems?.length} Items</Link>)
          </h1>
          <div className="flex p-[20px] mx-[20px] border-b border-gray-300">
            <div className="flex-[0.2]">
              <h3 className="text-xl font-bold">Delivery Address</h3>
            </div>
            <div className="flex-[0.8]">
              <p>123 React Lane</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>
          <div className="flex p-[20px] mx-[20px] border-b border-gray-300">
            <div className="payment__title">
              <h3 className="text-xl font-bold">Review Items and delivery</h3>
            </div>
            <div className="flex flex-col">
              {basketItems.map((basketItem: ProductListType) => (
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
          <div className="flex">
            <div className="payment__title">
              <h3 className="text-xl font-bold">Payment Method</h3>
            </div>
            <div className="flex-[0.8]">
              <form onSubmit={handleSubmit}>
                <CardElement />
                <div className="payment__priceContainer">
                  <h3 className="text-xl font-bold">
                    Order Total({basketItems.length}): <small>$</small>
                    {getTotal.toFixed(2)}
                  </h3>
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
