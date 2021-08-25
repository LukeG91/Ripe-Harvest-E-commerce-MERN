/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function ProductDetail() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [productDetail, setProductDetail] = useState([]);

  /* Using the useEffect hook to run this code once the component mounts and I am using 'params.id' and 'products' 
     as dependancies. The code maps through the products array and if the product._id matches the params.id value, 
     then I am updating the productDetail state variable to be the 'product' */
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }
  }, [params.id, products]);

  /* Using an if statement to retun null if the length of the productDetail array is 0 */
  if (productDetail.length === 0) return null;

  return (
    <>
      {/* Creating the JSX structure to display the relevant information relating to the product that is selected by the user */}
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
          {/* Mapping through the products array if 'product.category === productDetail.category' then the ProductItem
              component will be displayed and i am passing in product as a prop.  If the values don't match then 'null'
              will be returned */}
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

/* Exporting the ProductDetail component so that I can use it in my React app */
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
