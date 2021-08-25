/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

function OrderHistory() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  /* Using the useEffect hook to run this code once the component mounts and I am using 'token, isAdmin, setHistory' 
     as dependancies.  */
  useEffect(() => {
    /* The code checks if there is a token present and if the user is an Admin user and if it is an
     Admin user then all customer orders will be displayed, if the user is not an admin user then a different API
     caall will be made and only the order history linked to that user will be displayed */
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          /* Updating state */
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          /* Updating state */
          setHistory(res.data);
        }
      };
      /* Calling the getHistory function */
      getHistory();
    }
    /* Setting dependancies */
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2 className="orderHistoryComponentMainHeadings">History</h2>

      {/* Checking to see if the user is an Admin user and if the user is an Admin then an appropriate message will be displayed */}
      {isAdmin ? (
        <h4 className="orderHistoryComponentMainHeadings">
          You have {history.length} customer orders
        </h4>
      ) : (
        /* If the user is not an Admin user then the appropriate message below will be displayed as shown below*/
        <h4 className="orderHistoryComponentMainHeadings">
          You have ordered {history.length} times with Ripe Harvest
        </h4>
      )}

      {/* Creating a table to display the customers order history */}
      <table className="orderHistoryTable">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of purchase</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the history array and I am displaying the relevant order history that is relevant */}
          {history.map((items) => (
            <tr key={items._id}>
              <td>{items.paymentID}</td>
              <td>{new Date(items.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/history/${items._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Exporting the OrderHistory component so that I can use it in my React app */
export default OrderHistory;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
