/* Importing the modules and component that I need */
import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "../productItem/BtnRender";

/* Creating a function to display the individual product items, I am pulling in props that I am going to be using in this component */
function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    /* Creating the JSX structure for this component and I am using the props that I have passed to this component to display the 
       relevant information that I need to show */
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img
        src={product.images.url}
        alt=""
        width="100"
        height="100"
        style={{ objectFit: "cover" }}
      />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>R{product.price}</span>
        <p className="productItemComponentDescription">{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
