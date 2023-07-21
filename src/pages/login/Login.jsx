// import "./login.scss";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithGoogle } from "../../firebase";

// const Login = () => {
//   const [error, setError] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.log(error);
//       setError(error.message);
//     }
//   };

//   if (isLoggedIn) {
//     navigate("/home"); // redirect to home page after successful login
//   }

//   return (
//     <div className="login">
//       <h1 className="title">SMART BIN</h1>
//       <h2 className="admin-message">Hello Admin!</h2>
//       {error && <p className="error">{error}</p>}
//       <button onClick={handleSignIn} className="google-btn">
//         Sign in with your USLS email
//       </button>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Perform your login logic here
    // For example, you can use an authentication service or API
    // and handle the success/error responses accordingly

    // Dummy login logic for demonstration purposes
    if (email === "bryantsalva@gmail.com" && password === "Lastman123") {
      setIsLoggedIn(true);
      setError(null);
      navigate("/home"); // redirect to home page after successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h1 className="title">SMART BIN</h1>
      <h2 className="admin-message">Hello Admin!</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} className="login-btn">
        Sign In
      </button>
    </div>
  );
};

export default Login;











