

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import image4 from "../assets/log5.jpg";
import image5 from "../assets/google.png";
import image6 from "../assets/x.png";
import { API_URL } from "../api";


export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // New phone state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName, email, phone, password }),
    });

    const data = await response.json();
    console.log(data)

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", userName);
      alert("Signup Successful");
      window.location.href = "/";
    } else {
      setErr(data.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex w-full h-full" style={{ height: "calc(100vh - 72px)" }}>
        <div className="w-full p-4 flex flex-col justify-center items-center bg-white">
          <form onSubmit={handleSignup} className="w-76 max-w-sm">
            <h2 className="text-4xl mb-2 font-semibold text-red-900">Create Account</h2>
            <p className="text-sm text-gray-600 mb-6">Sign up to start using Book On Desk</p>

            <span className="text-sm text-red-600">{err}</span>

            <div className="mb-2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-user text-red-400"></i>
              </span>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-paper-plane text-red-400"></i>
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone Number Input */}
            <div className="mb-2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-phone text-red-400"></i>
              </span>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={phone}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, ""); // Keep only digits
                  if (onlyNums.length <= 10) {
                    setPhone(onlyNums);
                  }
                }}
                pattern="\d{10}"
                maxLength="10"
                title="Phone number must be exactly 10 digits"
                required
              />
            </div>

            <div className="mb-2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-lock text-red-400"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xl text-gray-400 mr-2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {/* {showPassword ? <i className="fa-solid fa-eye-slash text-red-300"></i> : <i className="fa-solid fa-eye text-red-300"></i>} */}
              </button>
            </div>

            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-lock text-red-400"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xl text-gray-400 mr-2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <i className="fa-solid fa-eye-slash text-red-400"></i> : <i className="fa-solid fa-eye text-red-400"></i>}
              </button>
            </div>

            <button
              type="submit"
              className="bg-red-800 text-white px-4 py-2 rounded w-full hover:scale-x-105 hover:scale-y-107 transition duration-150"
            >
              Sign Up
            </button>

            <p className="mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-800 font-medium">
                Login
              </Link>
            </p>
          </form>

          {/* <div className="text-center my-2 font-semibold text-black">- OR -</div> */}

          {/* <div className="flex justify-center gap-6 text-2xl">
            <a href="https://www.google.com/"><img src={image5} alt="My image" className="h-8 w-8"/></a>
          </div> */}
        </div>

        <div
          className="w-[65%] bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: `url(${image4})` }}
        >
          <div className="w-full h-full bg-linear-to-t from-[#00000088] to-transparent backdrop-blur-[4px] flex justify-center">
            <div className="text-center p-8 text-white mt-[20vh]">
              <h3 className="text-4xl font-semibold mb-4">Book On Desk</h3>
              <p>
                “Books should be shared, not shelved. Rent, Read, Return, Repeat.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
