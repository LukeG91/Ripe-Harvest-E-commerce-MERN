/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function OrderDetails() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  /* Using the useEffect hook to run this code once the component mounts and I am using 'params.id' and 'history' 
     as dependancies. The code maps through the history array and if the item._id matches the params.id value, 
     then I am updating the orderDetails state variable to be the 'item' */
  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  /* Using an if statement to retun null if the length of the orderDetails array is 0 */
  if (orderDetails.length === 0) return null;

  return (
    /* Creating the JSX structure to display tables which contain the details of the customers purchase */
    <div className="history-page">
      <table className="orderDetailsTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          {/* Adding the relevant information that is needed for the order details */}
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>
              {orderDetails.address.line1 + " - " + orderDetails.address.city}
            </td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      {/* Creating another table to display the products and quantity that the customer ordered as well as the price of the
        product */}
      <table style={{ margin: "30px 0px" }} className="productsTable">
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the cart array and I am displaying the relevant information relating to the products that
              are present in the users shopping cart. */}
          {orderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>R {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Exporting the OrderDetailscomponent so that I can use it in my React app */
export default OrderDetails;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
