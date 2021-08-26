/* Importing the libraries and hooks that I need */
import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  /* Setting state */
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  /* Using the use useEffect hook to run the code once the component renders */
  useEffect(() => {
    /* Creating a function to retrieve the products that are stored in the database */
    const getProducts = async () => {
      /* Making a GET request to the API  */
      const res = await axios.get(
        /* Querying the relevant API route and I am limiting the initial result to 12 products */
        `/api/products?limit=${
          page * 12
        }&${category}&${sort}&title[regex]=${search}`
      );
      /* Updating state */
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    /* Calling the getProducts() function */
    getProducts();
    /* Setting dependancies */
  }, [callback, category, sort, search, page]);

  /* Returning the state variables that I need so that I can use them within other components in my
     React app. */
  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

/* Exporting function so that I can use it where needed in my React App. */
export default ProductsAPI;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
