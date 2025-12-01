
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    };
    setEmail(localStorage.getItem("userEmail"));
    setUserName(localStorage.getItem("userName"));
    checkLogin();

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 h-16 shadow-md bg-white/80 backdrop-blur-md w-full">
      <nav className="overflow-visible">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <BookOpenIcon className="w-8 h-8 mr-2 text-amber-600" />
              <Link to="/" className="text-2xl font-bold text-gray-800">
                Book On Desk 
              </Link>
            </div>

{/*             <div className="hidden md:block w-72 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 ps-10 text-sm border border-gray-200 rounded-md bg-gray-50 focus:ring-1 focus:ring-red-300 outline-none"
              />
              <div className="absolute left-3 top-2.5 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
            </div> */}

           
          <div className="flex  space-x-7">
        
            <div className=" md:flex space-x-7">

            <div className="hidden md:flex items-center space-x-7">
              <NavLink 
                to="/browse" 
                className={({ isActive }) => 
                  `text-gray-800 hover:text-red-800 ${isActive ? "text-red-800 underline" : ""}`
                }
              >
                Browse
              </NavLink>
              <NavLink 
                to="/AddBook" 
                className={({ isActive }) => 
                  `text-gray-800 hover:text-red-800 ${isActive ? "text-red-800 underline" : ""}`
                }
              >
                Add Book
              </NavLink>
         
              {!isLogin ? (
                <Link to="/login">
                  <button className="bg-red-800 hover:bg-red-900 hover:shadow-md text-white px-4 py-1.5 rounded-md">
                    <h6 className="hover:scale-x-105 hover:scale-y-105 transition duration-150">Login</h6>
                  </button>
                </Link>
              ) : (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 focus:outline-none w-8 h-8">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=920229&color=fff&format=svg`}
                      alt="Profile"
                    />
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg z-50 focus:outline-none overflow-hidden">
                    <div className="px-4 py-3 text-sm">
                      <p className="text-gray-900">{userName}</p>
                      <p className="text-gray-500">{email}</p>
                    </div>
                    <ul className="text-sm text-gray-700">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/profile"
                            className={({ isActive }) => 
                              `block px-4 py-2 ${active ? "bg-gray-100" : ""} ${isActive ? "text-red-800" : ""}`
                            }
                          >
                            Profile
                          </NavLink>
                        )}
                      </Menu.Item>
            
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`block w-full text-left px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </ul>
                  </Menu.Items>
                </Menu>
              )}
            </div>
            
                        <div className=" flex space-x-7">
                           <Link to="/Cart" className="text-gray-800 hover:text-red-800 pt-1">
                          <FontAwesomeIcon icon={faShoppingCart} size="lg" color="black" />
                            </Link>

                            {email==="vikasvermagupta2@gmail.com" && (
                            <Link to="/Admin" className="text-gray-800 hover:text-red-800">
                           <ShieldCheckIcon className="w-7 h-7 text-red-800" />
                           </Link>
                             )}
                         </div>
            
              
            
          </div>

          
           <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

          
        </div>
        </div>
          
  </div>
            

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 bg-white">
{/*             <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 ps-10 text-sm border border-gray-200 rounded-md bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div> */}
            <ul className="space-y-3">
              <li>
                <NavLink 
                  to="/browse" 
                  className={({ isActive }) => 
                    `block text-gray-800 hover:text-red-700 ${isActive ? "text-red-700 underline" : ""}`
                  }
                >
                  Browse
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/AddBook" 
                  className={({ isActive }) => 
                    `block text-gray-800 hover:text-red-700 ${isActive ? "text-red-700 underline" : ""}`
                  }
                >
                  Add Book
                </NavLink>
              </li>
            </ul>

            <div className="">
              {!isLogin ? (
                <Link to="/login">
                  <button className="bg-red-800 hover:bg-red-900 hover:shadow-md text-white px-4 py-1.5 rounded-md">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="mt-2">
                  <p className="text-gray-900 font-medium">{userName}</p>
                  <p className="text-gray-600 text-sm">{email}</p>
                  <div className="mt-2">
                    <NavLink 
                      to="/profile" 
                      className={({ isActive }) => 
                        `block text-gray-700 py-1 hover:underline ${isActive ? "text-red-600" : ""}`
                      }
                    >
                      Profile
                    </NavLink>
                    <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
