import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="login-page">
      <h1>Login component</h1>
    </div>
  );
}

export default Login;
