import React, { useState, useEffect } from "react";
import axios from "axios";

function GetUsersAPI() {
  const [users, setUsers] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/user/allUsers");
      setUsers(res.data);
      console.log(res.data);
    };
    getUsers();
  }, [callback]);

  return {
    users: [users, setUsers],
    callback: [callback, setCallback],
  };
}

export default GetUsersAPI;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
