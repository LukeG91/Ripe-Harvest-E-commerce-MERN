/* Importing the modules/libraries and files that I need */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

/* Creating a function for the buttons that will be displayed on the product items/cards, different buttons will be shown
   according to whether a normal user is logged into the site or if an Admin user is logged in */
/* Pulling in the props that I passed to this component so that I can use them in this component */
function BtnRender({ product, deleteProduct }) {
  /* Pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    /* Creating the JSX structure to display the relevant buttons that will be shown on the product cards */
    <div className="row_btn">
      {/* If a user is a Admin user, then the Delete and Edit buttons will be displayed as only Admin users 
          can edit and delete products */}
      {isAdmin ? (
        <>
          {/* Using the deleteProduct() function which I passed in as a prop to this component */}
          {/* Using the product prop that I pulled in to speify arguments that are needed in order to delete
              a specific product */}
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          {/* If a user is a normal user and not an Admin user, then the 'Purchase Product' and 'View Product'
            Links/buttons will be available. */}
          <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
            Purchase Product
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View Product
          </Link>
        </>
      )}
    </div>
  );
}

/* Exporting BtnRender so that I can use it in other files/components in my application */
export default BtnRender;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
