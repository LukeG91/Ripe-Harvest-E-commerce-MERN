import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }
  }, [params, products]);

  if (productDetail.length === 0) return null;

  return (
    <div className="detail">
      <img
        src={productDetail.images.url}
        alt=""
        className="productDetailImage"
      />
      <div className="box-detail">
        <div className="row">
          <h2>{productDetail.title}</h2>
          <h2>#id: {productDetail.product_id}</h2>
        </div>
        <span>R{productDetail.price}</span>
        <p>{productDetail.description}</p>
        <p>{productDetail.content}</p>
        <p>Items sold: {productDetail.sold}</p>
        <Link to="/cart" className="cart">
          Buy Now
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
