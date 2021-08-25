import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }
  }, [params.id, products]);

  if (productDetail.length === 0) return null;

  return (
    <>
      <div className="detail">
        <img
          src={productDetail.images.url}
          alt=""
          className="productDetailImage"
        />
        <div className="box-detail">
          <div className="row">
            <h2>{productDetail.title}</h2>
            <p className="productDetailComponentID">
              #id: {productDetail.product_id}
            </p>
          </div>
          <span>R{productDetail.price}</span>
          <p>{productDetail.description}</p>
          <p>{productDetail.content}</p>
          <p>Items sold: {productDetail.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(ProductDetail)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2 className="relatedProductsHeading">Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === productDetail.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
