import axios from "axios";
import { useQuery } from "react-query";
import { useProductsStore } from "../store";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  units: number;
}

const data = "https://fakestoreapi.com/products";

const getSearchedProduct = useProductsStore(
  (state: any) => state.getSearchedProduct
);

export const useProductsQuery = async (datas: any) => {
  return useQuery("products-list", () => axios.get(data));
};
