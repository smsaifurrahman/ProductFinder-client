/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ProductCard from "../Components/ProductCard";
import { useState } from "react";

const Products = () => {
   const axiosPublic = useAxiosPublic();

   const [itemPerPage, setItemPerPage] = useState(6);
   const [productCount, setProductCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [search, setSearch] = useState("");
   const [sortOption, setSortOption] = useState("");
   const [filters, setFilters] = useState({
      brandName: "",
      category: "",
      priceRange: "", // under100 or above100
   });

   // Available options

   const brandNames = [
      "TechCorp",
      "AudioPlus",
      "VisionTech",
      "SoundWave",
      "PlayMaster",
      "FitTrack",
      "ZenLife",
      "StrengthMax",
      "CookMaster",
      "KitchenMaster",
      "CleanBot",
      "WashPro",
      "CoolMaster",
      "BrewMaster",
      "DryAir",
      "SewMaster",
      "HeatMaster",
      "CleanMaster",
      "WarmMaster"
  ];
  

   const categories = [
      "Electronics",
      "Health & Fitness",
      "Home Appliances",
     
   ];

   // Function to handle sorting change
   const handleSortChange = (e) => {
      const value = e.target.value;
      setSortOption(value);
   };

   // Function to handle filter input change
   const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
         ...prevFilters,
         [name]: value,
      }));
   };

   // Function to apply filters
   const applyFilters = (e) => {
      e.preventDefault();
      refetch();
   };

   // Function to reset filters
   const resetFilters = () => {
      setFilters({
         brandName: "",
         category: "",
         priceRange: "",
      });
      setSortOption("");
      refetch();
   };

   const {
      data: products = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["products", currentPage, itemPerPage, search, sortOption, filters],
      queryFn: async () => {
         const { data } = await axiosPublic(
            `/products?page=${currentPage}&size=${itemPerPage}&search=${search}&sort=${sortOption}&brandName=${filters.brandName}&category=${filters.category}&priceRange=${filters.priceRange}`
         );
         console.log(data);
         return data;
      },
   });

   const { data: productsCount = [] } = useQuery({
      queryKey: ["products-count", search, filters],
      queryFn: async () => {
         const { data } = await axiosPublic(
            `/products-count?search=${search}&brandName=${filters.brandName}&category=${filters.category}&priceRange=${filters.priceRange}`
         );
         setProductCount(data.count);
         return data;
      },
   });

   const numberOfPages = Math.ceil(productCount / itemPerPage);

   const pages = [
      ...Array(numberOfPages)
         .keys()
         .map((element) => element + 1),
   ];

   // handle pagination button
   const handlePaginationButton = (value) => {
      setCurrentPage(value);
   };

   // handle search
   const handleSearch = (e) => {
      e.preventDefault();
      const text = e.target.search.value;
      setSearch(text);
   };

   if (isLoading)
      return <span className="loading loading-dots loading-lg"></span>;

   return (
      <div>
         <h1 className="text text-3xl text-center my-8 font-bold">
            Product Finder Products
         </h1>

         <div className="flex items-center justify-center flex-wrap gap-4">
            <div className=" my-8">
               <div className="w-96 flex flex-col items-center justify-center">
                  <form onSubmit={handleSearch}>
                     <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                        <input
                           className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                           type="text"
                           name="search"
                           placeholder="Search"
                           aria-label="Search Product"
                        />

                        <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                           Search
                        </button>
                     </div>
                  </form>
               </div>
            </div>

            <div>
               <select
                  className="select select-primary w-full max-w-xs"
                  onChange={handleSortChange}
                  value={sortOption}
               >
                  <option disabled value="">
                     Sort Products by
                  </option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-productCreationDate">Newest first</option>
               </select>
            </div>
         </div>

         {/* Filters Section */}
         <form onSubmit={applyFilters} className="flex flex-wrap justify-center gap-4">
            <div>
               <select
                  className="select select-bordered w-full max-w-xs"
                  name="brandName"
                  value={filters.brandName}
                  onChange={handleFilterChange}
               >
                  <option disabled value="">
                     Select Brand
                  </option>
                  {brandNames.map((brand) => (
                     <option key={brand} value={brand}>
                        {brand}
                     </option>
                  ))}
               </select>
            </div>

            <div>
               <select
                  className="select select-bordered w-full max-w-xs"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
               >
                  <option disabled value="">
                     Select Category
                  </option>
                  {categories.map((category) => (
                     <option key={category} value={category}>
                        {category}
                     </option>
                  ))}
               </select>
            </div>

            <div className="flex flex-col items-start">
               <span className="font-bold">Price Range:</span>
               <label className="label cursor-pointer">
                  <input
                     type="radio"
                     name="priceRange"
                     value="under100"
                     checked={filters.priceRange === "under100"}
                     onChange={handleFilterChange}
                     className="radio radio-primary"
                  />
                  <span className="ml-2">Under $100</span>
               </label>
               <label className="label cursor-pointer">
                  <input
                     type="radio"
                     name="priceRange"
                     value="above100"
                     checked={filters.priceRange === "above100"}
                     onChange={handleFilterChange}
                     className="radio radio-primary"
                  />
                  <span className="ml-2">Above $100</span>
               </label>
            </div>

            {/* <button
               type="submit"
               className="btn btn-primary"
            >
               Apply Filters
            </button> */}

            <button
               type="button"
               className="btn btn-secondary"
               onClick={resetFilters}
            >
               Reset Filters
            </button>
         </form>

         <div className="px-2 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {products.map((product) => (
               <ProductCard key={product._id} product={product}></ProductCard>
            ))}
         </div>

         {/* Pagination buttons */}
         <div className="flex justify-center my-12">
            <button
               disabled={currentPage === 1}
               onClick={() => handlePaginationButton(currentPage - 1)}
               className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
            >
               <div className="flex items-center -mx-1">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 mx-1 rtl:-scale-x-100"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                     />
                  </svg>

                  <span className="mx-1">Previous</span>
               </div>
            </button>

            {pages.map((btnNum) => (
               <button
                  onClick={() => handlePaginationButton(btnNum)}
                  key={btnNum}
                  className={`hidden ${
                     currentPage === btnNum ? "bg-blue-500 text-white" : ""
                  } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
               >
                  {btnNum}
               </button>
            ))}

            <button
               disabled={currentPage === numberOfPages}
               onClick={() => handlePaginationButton(currentPage + 1)}
               className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
            >
               <div className="flex items-center -mx-1">
                  <span className="mx-1">Next</span>

                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 mx-1 rtl:-scale-x-100"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                     />
                  </svg>
               </div>
            </button>
         </div>
      </div>
   );
};

export default Products;
