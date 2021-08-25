/* Importing the libraries/modules that I need and I am importing GlobalState */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
/* Importing the modules that I need from 'react-router-dom' */
import { useHistory, useParams } from "react-router-dom";

/* Creating a variable that is an object that will be used to store information related to a product when an Admin user
   creates a new product */
const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "Ripe Harvest, providing real health.",
  content:
    "We sell health products such as honey and fresh berries and will be adding loads more products soon.",
  category: "",
  _id: "",
};

function CreateProduct() {
  /* Setting state and I am pulling in state variables from GlobalState */
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  /* Using modules from react-router-dom and I am setting variables so that I can use in this component */
  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  /* using the useEffect react hook to run the code once the component has mounted and I am using 'param.id, products'
     as dependancies */
  useEffect(() => {
    /* Using an if statement to check if 'param.id' is true(has a value) and if it is I am updating the onEdit state variable
       and then I am running a forEach loop on the products array and if the 'product._id === param.id' then I am updating the
       product and images state variables */
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
      /* If param.id does not have a value then Iam updating the relevant pieces of state below to contain the relevant information  */
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
    /* Setting the dependancies for the useEffect() function */
  }, [param.id, products]);

  /* Creating an event handler to take care of the uploading of a product */
  const handleUpload = async (e) => {
    e.preventDefault();
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Using an if statement to check if the user is not an admin user and an appropriate message will be displayed 
         if the user is not an Admin user */
      if (!isAdmin) return alert("You are not an Admin.");

      /* Creating a variable and I am storing the first element in the variable */
      const file = e.target.files[0];

      /* If no file is present then an appropriate message will be returned */
      if (!file) return alert("File does not exist.");

      /* Using an if statement to ensure that the file type that the Admin user is trying to upload is either
         'jpeg' or 'png', if it is a different file type, then an appropriate message will be returned */
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert(
          "Incorrect file format, only.png and .jpeg files are allowed."
        );

      /* Creating a variable and I am appending the "file" key as well as the file variable */
      let formData = new FormData();
      formData.append("file", file);

      /* Updating state */
      setLoading(true);

      /* Making an API call and I am posting the formData to the server/API and I am passing in the correct header information
         in order to be able to upload the data successfully */
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      /* Updating state */
      setLoading(false);
      setImages(res.data);

      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  /* Creating a function to handle the deletion of the image that the user uploads */
  const handleDestroy = async () => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Using an if statement to check if the user is not an admin user, if the user is not an admin user, then
         an appropriate message will be returned advising accordingly. */
      if (!isAdmin) return alert("You are not an Admin.");
      /* Updating state */
      setLoading(true);
      /* Making a POST request to the API route that is responsible for handling the deletion of a product image. */
      await axios.post(
        "/api/destroy",
        /* Passing in the image that must be deleted */
        { public_id: images.public_id },
        /* Passing the token through for user authorization through the headers by using 'Authorization' as the key. */
        {
          headers: { Authorization: token },
        }
      );
      /* Updating state */
      setLoading(false);
      setImages(false);
      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  /* Creating an event handler to handle user inputs */
  const handleChangeInput = (e) => {
    /* Deconstructing the information from the target and I am extracting the information I need */
    const { name, value } = e.target;
    /* Updating state and I am spreading the information in the products array and I am extracting the name
       property from the HTML input elements where this function is run and I am setting these properties to 
       the values that the user enters. */
    setProduct({ ...product, [name]: value });
  };

  /* Creating an event handler to handle the submission of the form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Using an if statement to check if the user is not an admin and if they aren't, then an appropriate message
         will be returned */
      if (!isAdmin) return alert("You are not an Admin.");
      /* Using an if statement to check if there isn't an image uploaded and if there isn't, then an appropriate message
         will be returned */
      if (!images)
        return alert(
          "Please upload an image of the product before trying to create a product."
        );

      /* Using an if statement to check if the onEdit variable has a value and if this is true, then
         a PUT(update) request will be made to the API */
      if (onEdit) {
        /* Making a PUT request to the relevant API route */
        await axios.put(
          /* Specifying the product ID of the product that must be updated by using the 'product._id' variable */
          `/api/products/${product._id}`,
          /* I am spreading the products array to pass in what is currently stored in it and I am passing in
             the image variable */
          { ...product, images },
          /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
             key */
          {
            headers: { Authorization: token },
          }
        );
        /* If onEdit is false then a new product will be created instead of an existing product being updated */
      } else {
        /* Making a POST request to the API route that is responsible for creating a new product */
        await axios.post(
          /* Making a call to the relevant API route */
          "/api/products",
          /* Passing in the variables that I need to pass throuh to the API in the request in order to be able to
             create a new product */
          { ...product, images },
          /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
             key */
          {
            headers: { Authorization: token },
          }
        );
      }
      /* Updating state */
      setCallback(!callback);
      /* Once the product has been created I am using the useHistory() hook from react-router-dom which I have assigned to the
         history variable to redirect the user to the home page of the website */
      history.push("/");
      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  /* Creating a variable that stores the display style property and I am setting this based on if there is an image
     that has been uploaded or if there isn't one. */
  const styleUpload = {
    display: images ? "block" : "none",
  };

  /* Creating the JSX structure for how the create product page will be layed out */
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />

        {/* If the loading variable is true then I am going to render the Loading component while the image uploads */}
        {loading ? (
          <div id="file_img" style={styleUpload}>
            <Loading />
          </div>
        ) : (
          /* When the image has uploadd, I am displaying the image on the web page */
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      {/* Creating a form that the user will use to enter the details of the product they are creating */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID:</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content:</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {/* Mapping through the categories array and I am creating HTML option elements
                that contain the different categories that the user can assign the new product to */}
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Creating a button and the text that is displayed on the button will be dependant on whether
            or not the onEdit variable is true */}
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

/* Exporting the CreateProduct component so that I can use it in my React App */
export default CreateProduct;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
