/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

function Categories() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  /* Creating a function to handle new product category creation  */
  const productCategoryCreation = async (e) => {
    e.preventDefault();
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Using an if statement to check if the onEdit variable has a value and if this is true, then
         a PUT(update) request will be made to the API */
      if (onEdit) {
        /* Making a PUT request to the API */
        const res = await axios.put(
          /* Using the relevant API route to made an update to an exisiting category using the 'id' variable. */
          `/api/category/${id}`,
          /* Passing in the information needed in order to update/change the name of an existing product category */
          { name: category },
          /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
             key */
          {
            headers: { Authorization: token },
          }
        );
        /* An alert returning the relevant message that is returned from the API */
        alert(res.data.msg);
        /* If the onEdit variable is false then a POST request will be made as a new product category will need
           to be created */
      } else {
        /* Making a POST request to the API */
        const res = await axios.post(
          /* Using the relevant API route */
          "/api/category",
          /* Passing in the name of the category that the user is creating */
          { name: category },
          /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
             key */
          {
            headers: { Authorization: token },
          }
        );
        /* An alert returning the relevant message that is returned from the API */
        alert(res.data.msg);
      }
      /* Updating state */
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  /* Creating a function to handle the editing/updating of a product category */
  const productCategoryUpdate = async (id, name) => {
    /* Updating state with the values that are passed into this function as arguments */
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  /* Creating a function to handle product deletion */
  const productCategoryRemoval = async (id) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Making a DELETE request to the API using the 'id' variable */
      const res = await axios.delete(`/api/category/${id}`, {
        /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
           key */
        headers: { Authorization: token },
      });
      /* An alert will display the relevant message that is returned from the API */
      alert(res.data.msg);
      /* updating state */
      setCallback(!callback);
      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      /* An alert will display the relevant message that is returned from the API */
      alert(error.response.data.msg);
    }
  };

  /* Creating the JSX structure for the categories web page */
  return (
    <div className="categories">
      {/* Creating a form for the Admin user to enter the name of the new category they would like to create */}
      <form onSubmit={productCategoryCreation}>
        <label htmlFor="category">Product categories</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        {/* Creating a button and the text in the button will change according to whether the
            onEdit variable is true or not */}
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>

      <div className="col">
        {/* Mapping through the categories array and I am dislaying the name of each category that exists */}
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              {/* The buttons below are positioned to the right of the name of the category  */}
              {/* Calling the productCategoryUpdate function and I am passing in the 'category._id' and 'category.name' as arguments */}
              <button
                onClick={() =>
                  productCategoryUpdate(category._id, category.name)
                }
              >
                Edit
              </button>
              {/* Calling the productCategoryRemoval function and I am passing in 'category._id' as an argument */}
              <button onClick={() => productCategoryRemoval(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Exporting the Categories component so that I can use it in my React app */
export default Categories;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
