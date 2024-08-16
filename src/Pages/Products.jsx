/** @format */

import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ProductCard from "../Components/ProductCard";

const Products = () => {
   const axiosPublic = useAxiosPublic();
   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const { data } = await axiosPublic(`/products`);
         //   setProductCount(data.length)
         return data;
      },
   });
   return (
      <div>
         <h1 className="text text-3xl text-center my-8 font-bold">
            Product Finder Products
         </h1>
         <div className=" px-2 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
               <ProductCard key={product.id} product={product}></ProductCard>
            ))}
         </div>
      </div>
   );
};

export default Products;
