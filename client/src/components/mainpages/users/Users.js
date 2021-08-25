import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

/* This web page is not yet fully complete, I am still going to add features to delete a user and change their role from
   a user to an admin user. I did not have time to complete this feature, for now the users that are registered on the system 
   display on the web page, I just need to complete the functionality. */

function Users() {
  const state = useContext(GlobalState);
  const [users] = state.getUsersApi.users;
  const [editUser, setEditUser] = useState(false);
  const [userRole, setUserRole] = useState(0);
  const [token] = state.token;
  const [callback, setCallback] = state.getUsersApi.callback;

  const removeUser = async (id) => {
    // try {
    //   const res = await axios.delete(`/user/deleteUser/${id}`, {
    //     headers: { Authorization: token },
    //   });
    //   alert(res.data.msg);
    //   setCallback(!callback);
    // } catch (err) {
    //   alert(err.response.data.msg);
    // }
  };

  return (
    <>
      <h1 className="userPageMainHeading">All users:</h1>
      <h3 className="informUser">
        The 'Edit' and 'Delete' buttons are still in development and are not yet
        functioning.
      </h3>
      <div className="showAllUsersContainer">
        {/* <h1>Users page</h1> */}
        {/* <form onSubmit={editUserRole}>
        <label htmlFor="users">User</label>
        <input
          type="text"
          name="users"
          value={userRole}
          required
          onChange={(e) => setUserRole(e.target.value)}
        />
        <button type="submit">Update</button>
      </form> */}

        <div className="userInformationContainer">
          {users.map((user) => (
            <div className="row" key={user._id}>
              <p>Name: {user.name}</p>
              <p className="userEmailInfo">Email: {user.email}</p>
              <p className="userRoleInfo">Role: {user.role}</p>
              <div className="usersPageButtonContainer">
                <button className="userInfoEditButton">Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
