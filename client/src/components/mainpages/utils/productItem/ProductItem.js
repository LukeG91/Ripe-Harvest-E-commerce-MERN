import React from "react";

function ProductItem({ product }) {
  return (
    <div className="product_card">
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
        <span>R{product.description}</span>
      </div>
    </div>
  );
}

export default ProductItem;
