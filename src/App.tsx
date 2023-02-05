import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./components/ProductList";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { useState } from "react";
import CheckoutPage from "./pages/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const promise = loadStripe(`${import.meta.env.STRIPE_PUBLIC_KEY}`);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <ProductList />
                </ProtectedRoutes>
              }
            ></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/product/:productId"
              element={
                <ProtectedRoutes>
                  <ProductDetail />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <CartPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/checkout"
              element={
                <Elements stripe={promise}>
                  <CheckoutPage />
                </Elements>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
