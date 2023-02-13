import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useProductsStore } from "../../store";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const authUser = useProductsStore((state: any) => state.authUser);
  const basketItems = useProductsStore((state: any) => state.basketItems);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const setShowSearchBar = useProductsStore(
    (state: any) => state.setShowSearchBar
  );

  useEffect(() => {
    setShowSearchBar(false);
  }, []);

  console.log("User", authUser);

  const logOut = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src="https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"
            alt="Woman looking front"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">
            {authUser.userFirstName} {authUser.userLastName}
          </h2>
          <p className="text-gray-500">Customer</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <AiTwotoneMail className="text-blue-900" />
            <div className="text-xs">{authUser.userEmail}</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <BsFillCartFill className="text-blue-900" />
            <div>{basketItems.length}</div>
          </li>
        </ul>
        <div className="p-4 border-t mx-8 mt-2">
          <button
            onClick={() => logOut()}
            className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
