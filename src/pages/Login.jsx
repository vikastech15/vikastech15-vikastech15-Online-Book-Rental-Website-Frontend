
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import image4 from "../assets/log6.jpg";
import image5 from "../assets/google.png";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("userName", data.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);

      window.location.href = "/";
    } else {
      setErr(data.message || "Login failed");
      alert("Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
  
      const userInfo = await res.json();
      const email = userInfo.email;

      console.log(userInfo)
  
      // Check if user exists in your backend
      const response = await fetch(`${API_URL}/api/auth/check-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (data.exists) {
        // User exists, auto-login
        localStorage.setItem("userName", data.username);
        localStorage.setItem("token", data.token); //token should be returned from backend
        localStorage.setItem("userEmail", email);
        navigate("/");
      } else {
        alert("Account doesn't exist");
        // Redirect to signup with pre-filled email maybe
        navigate("/signup", { state: { email } });
      }
    },
    onError: () => {
      alert("Google login failed");
    },
  });

  return (
    <>
      <Navbar />

      <div
        className="flex w-full h-screen"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="w-full p-4 flex flex-col justify-center items-center bg-white">
          <form onSubmit={handleLogin} className="w-76 max-w-sm">
            <h2 className="text-4xl mb-2 font-semibold text-red-900">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Login to continue to Book On Desk
            </p>

            <span className="text-sm text-red-600">{err}</span>

            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                {/* <i className="fa-solid fa-user"></i> */}
                <i className="fa-solid fa-paper-plane text-red-400"></i>
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-lock text-red-400"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xl text-red-400 mr-2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1" // Skip this button while tabbing
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye text-red-400"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-red-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye text-red-400"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>

            <button
              type="submit"
              className="bg-red-800 text-white px-4 py-2 rounded w-full hover:scale-x-105 hover:scale-y-107 transition duration-150"
            >
              Login
            </button>

            <p className="mt-4  text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-800 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
          <div className="text-center my-4 font-semibold text-black">
            - OR -
          </div>
          <div className="flex justify-center gap-6 text-2xl">
            <button onClick={googleLogin}><img src={image5} alt="My image" className="h-8 w-8 hover:scale-x-110 hover:scale-y-110 transition duration-150"/></button>

          </div>
        </div>

        
        <div
          className="w-[65%] bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: `url(${image4})` }}
        >
          <div className="w-full h-full bg-linear-to-t from-[#00000088] to-transparent backdrop-blur-[4px] flex justify-center">
            <div className="text-center p-8 text-white mt-[20vh]">
              <h3 className="text-4xl font-semibold mb-4 ">(^-^) &lt;3 </h3>
              <p>“Let’s dive into the mysterious world of books.”</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
