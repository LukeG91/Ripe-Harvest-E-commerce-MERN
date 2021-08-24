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
