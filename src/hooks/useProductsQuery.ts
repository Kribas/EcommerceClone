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

export const useProductsQuery = (category: string) => {
  return useQuery(category, () => {
    return axios.get(`https://fakestoreapi.com/products/category/${category}`);
  });
};
