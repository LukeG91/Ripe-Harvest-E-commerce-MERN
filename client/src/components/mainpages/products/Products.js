/* Importing the modules, files and components that I need to use in this component */
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import Footer from "../../footer/Footer";

function Products() {
  /* Setting state and I am pulling in state variables from GlobalState*/
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  /* Creating a function to check if the product id matches the id that is parsed in as an argument 
     and if it is, then I am setting product.checked to false */
  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    /* I am spreading the products array and I am storing this information in the products state variable */
    setProducts([...products]);
  };

  /* Creating a function to delete a product */
  const deleteProduct = async (id, public_id) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Updating state and I am creating a variable that will be used to remove the product image */
      setLoading(true);
      const destroyImg = await axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      /* Creating a variable that will be used to process product deletion */
      const deleteProduct = await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      /* Awaiting the response from the API calls and I am processing the image as well as the product deletion */
      await destroyImg;
      await deleteProduct;

      /* Updating state */
      setCallback(!callback);
      setLoading(false);

      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  /* Creating a function to allow Amin users to select/check all products and I am updating th relevant pieces of state */
  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  /* Creating a function to allow Admin users to deleteall products */
  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  /* Using an if statement to check if the 'loading' variable is true(has a value) and if it is, then I will return
     the Loading component which will display the loading wheel so thatthe user knows that the website is fetching/pulling 
     in information */
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      {/* Returning the Filters component */}
      <Filters />
      {/* If the user is an Admin user then the 'Select all' and 'Delete All' buttons will be displayed */}
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete all</button>
        </div>
      )}

      {/* Mapping through the products array and I am pulling in the 'ProductItem' component and I am passing in the props
          that are needed to display all the relevant product information in each product item */}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>

      {/* Displaying the LoadMore component so that the user can display more products than the default/original display 
          which displays 9 products*/}
      <LoadMore />
      {products.length === 0 && <Loading />}
      {/* Displaying the footer component */}
      <Footer />
    </>
  );
}

export default Products;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
