/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function LoadMore() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    /* If there are less than 9 producs then the 'Load more' button will not be displayed and if there are more than 9 products 
       then it will be displayed */
    <div className="load_more">
      {result < page * 9 ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}

/* Exporting the LoadMore component so that I can use it in my React app. */
export default LoadMore;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
