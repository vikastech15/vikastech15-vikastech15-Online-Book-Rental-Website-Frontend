import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Browse() {
  const [products, setProducts] = useState([]);


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full  text-gray-800">
        <ProductList products={products} />
      </div>
    </>
  );
}
