import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
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

      <input
        type="text"
        value={search}
        placeholder="Enter your search criteria"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="searchInputFilter"
      />

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
