import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);

  const handleCheck = (id) => {
    console.log(id);
  };

  const deleteProduct = async (id, public_id) => {
    console.log({ id, public_id });
    // try {
    //   setLoading(true);
    //   const destroyImg = await axios.post(
    //     "/api/destroy",
    //     { public_id },
    //     {
    //       headers: { Authorization: token },
    //     }
    //   );
    // const deleteProduct = await axios.delete(`/api/products/${id}`, {
    //   headers: { Authorization: token },
    // });
    //   await destroyImg;
    //   await deleteProduct;
    //   setLoading(false);
    //   setCallback(!callback);
    // } catch (error) {
    //   alert(error.response.data.msg);
    // }
  };

  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
