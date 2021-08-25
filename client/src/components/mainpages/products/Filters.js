/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  /* Creating an event handler to update the category state variable */
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    /* Creating the JSX structure and I am mapping through the categories array and I am displaying the different categories
       in an 'option' HTML element */
    <div className="filter_menu">
      <div className="row">
        <span className="sortAndFilterHeadings">Filters: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Creating an input that will allow the user to search for products */}
      <input
        type="text"
        value={search}
        placeholder="Enter your search criteria"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="searchInputFilter"
      />

      {/* Creating the container and the option values needed for the sorting feature */}
      <div className="row sort">
        <span className="sortAndFilterHeadings">Sort By: </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="selectFilterComponent"
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sellers</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
}

/* Exporting the LoadMore component so that I can use it in my React app. */
export default Filters;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
