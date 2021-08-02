import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "../productItem/BtnRender";

function ProductItem({ product, isAdmin }) {
  return (
    <div className="product_card">
      {
        isAdmin && <input type="checkbox" checked={product.checked}/>
      }
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
        <p>{product.description}</p>
      </div>

      

      <BtnRender product={product} />
    </div>
  );
}

export default ProductItem;
