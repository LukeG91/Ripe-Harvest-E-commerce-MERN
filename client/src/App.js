/* Importing the libraries, modules and files that I need */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";

function App() {
  return (
    /* Using the DataProvider to make the global state variables available in the different pages/components of the website. */
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;

/* Notes and take away points from this task:
   ==========================================
     
   1. This task was very exciting and also a very big challenge,
      I was motivated and very determined to deliver the highest 
     quality of work and to push through bugs that had me stuck 
     for hours because this website is for a real customer.
   2. I gained so much knowldge by doing this build, I now know how 
      to make use of the Cloudinary media storage cloud service and 
      how to use PayPal as a payment gateway in my applications.
   3. My understanding of how everything ties together in a full stack MERN 
      application really came together in this task, it took me very long to build 
      and there are still a few more tweaks as well as a few more features that I will 
      be adding overtime, overall this project really made me feel like I have a deep 
      and good unuderstanding of code and has given me great confidence to go forward 
      into my Web Development career.
    4. This task was fairly daunting in the beginnning, but now that I have built the application
       and I understand how the front end and back end interact with each other and how the database ties in, 
       my confidencein my developing ability has really gone to the next level and I am excited to build
       on this and to land a Junior developer role soon after graduating so I can learn and grow more as
       well as gain more confidence.
    5.  All in all I thoroughly enjoyed this build and it gave me such a good grounding and base to build on
        as I would like to specialize in full stack e-commerce MERN development as I have a real passion for e-commerce/online shopping.
*/

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
