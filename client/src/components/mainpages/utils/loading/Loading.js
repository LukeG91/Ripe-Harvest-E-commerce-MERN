/* Importing React and the style sheet that I am going to be using to style this component */
import React from "react";
import "./loading.css";

/* Creating a function to return a loading wheel that will show up on web pages when the application is in the process of
   trying to load information that the user has requested. */
function Loading() {
  return (
    <div className="load-page">
      <div className="loader">
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Exporting the Loading component so that I can use it in other components of my React App */
export default Loading;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
