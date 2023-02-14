import React, { useEffect } from "react";
import { useProductsQuery } from "../../../hooks/useProductsQuery";
import { useProductsStore } from "../../../store";
import loading from "../../../assets/loading.gif";
import Header from "../../../components/Header";
import { ProductListType } from "../../../types/ProductListType";
import Product from "../../../components/Product";

const WomensClothing = () => {
  const { data, isLoading } = useProductsQuery("women's clothing");

  const setShowSearchBar = useProductsStore(
    (state: any) => state.setShowSearchBar
  );
  useEffect(() => {
    setShowSearchBar(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <img src={loading} alt="Loading Gif" />
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
        {data?.data.map((product: ProductListType) => (
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
    </>
  );
};

export default WomensClothing;
