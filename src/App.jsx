import './App.css'
import AddBook from './pages/AddBook'
import ShowBook from './pages/showBook'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Community from './pages/Community'
// import ScrollToTop from "./components/ScrollToTop";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile'
import CheckoutPage from './pages/Checkout'
import CartPage from './pages/Cart'
import AdminDashboard from './pages/Admin'
function App() {

  const router = createBrowserRouter([
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Community",
        element: <Community/>,
      },
      {
        path: "/ShowBooks/:id",
        element: <ShowBook/>,

      },
      {
        path: "/AddBook",
        element: <AddBook/>,
      },
      {
        path: "/Browse",
        element: <Browse/>,
      },
      {
        path: "Login",
        element: <Login/>,
      },
      {
         path: "Signup",
          element: <Signup/>,
      },
      {
        path: "Profile",
        element: <Profile/>
      },
      {
        path: "Checkout",
        element: <CheckoutPage/>
      },
      {
        path: "Cart",
        element: <CartPage/>
      },
      {
        path: "Admin",
        element: <AdminDashboard/>
      },
    ])

  return (
    <>
               {/* <ScrollToTop /> */}
       <RouterProvider router={router} />

      </>
  )
}

export default App
