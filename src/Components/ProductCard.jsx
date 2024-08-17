/** @format */

import React from "react";
import { format } from 'date-fns';

const ProductCard = ({product}) => {
   
const formattedDate = format(new Date(product.productCreationDate), 'MMMM dd, yyyy');
    
   return (
      <div className="card bg-base-100  shadow-xl">
         <figure>
            <img
               src= {product.productImage}
               alt="Shoes"
            />
         </figure>
         <div className="card-body">
            <h2 className="card-title"> {product.productName} </h2>
            <p className="font-bold"> Brand Name: {product.brandName} </p>
            <p className="font-bold"> Category: {product.category} </p>
            <p className="font-bold"> Price: {product.price} </p>
            <p className="font-bold"> Description: {product.description} </p>
            <p className="font-bold"> Arrival: {formattedDate} </p>
            <div className="card-actions justify-end">
               <button className="btn btn-primary">Buy Now</button>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
