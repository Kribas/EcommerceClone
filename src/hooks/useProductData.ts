import axios from "axios";
import { useQuery } from "react-query";

export const useProductData = (productId: string | undefined) => {
  return useQuery(["product-data", productId], () => {
    return axios.get(`https://fakestoreapi.com/products/${productId}`);
  });
};
