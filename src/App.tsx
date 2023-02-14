import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./components/ProductList";
import CartPage from "./pages/CartPage";
import { QueryClientProvider, QueryClient, useMutation } from "react-query";
import CheckoutPage from "./pages/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/userProfile/UserProfile";
import Jewellery from "./pages/categories/jewellery/Jewellery";
import MensClothing from "./pages/categories/mensClothing/MensClothing";
import Electronics from "./pages/categories/electronics/Electronics";
import WomensClothing from "./pages/categories/womensClothing/WomensClothing";

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
              path="/profile"
              element={
                <ProtectedRoutes>
                  <UserProfile />
                </ProtectedRoutes>
              }
            />
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
              path="/mensclothing"
              element={
                <ProtectedRoutes>
                  <MensClothing />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/jewellery"
              element={
                <ProtectedRoutes>
                  <Jewellery />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/electronics"
              element={
                <ProtectedRoutes>
                  <Electronics />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/womensclothing"
              element={
                <ProtectedRoutes>
                  <WomensClothing />
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
