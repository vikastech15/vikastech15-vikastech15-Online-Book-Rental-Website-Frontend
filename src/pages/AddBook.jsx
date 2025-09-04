
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import ImageUploader from "../components/ImageUploader";

const genreOptions = [
  { value: "Fiction", label: "Fiction" },
  { value: "Romance", label: "Romance" },
  { value: "Mystery", label: "Mystery" },
  { value: "Science", label: "Science" },
  { value: "Competitive", label: "Competitive" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Research", label: "Research" },
];

const AddBook = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [apiThumbnail, setApiThumbnail] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (apiThumbnail) formData.append("thumbnailUrl", apiThumbnail);
    
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("title", data.title);
    formData.append("pages", data.pages);
    formData.append("price", data.price);
    formData.append("isbn", data.isbn);
    formData.append("condition", data.condition);
    formData.append("forSaleData", data.forSaleData);

    data.genre?.forEach(g => formData.append("genre[]", g.value));
    images.forEach(image => formData.append("images", image));

    try {
      await axios.post("/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book submitted successfully!");
      navigate("/Browse");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to submit book!");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const isbn = getValues("isbn");
    if (!isbn) {
      alert("Please enter the ISBN number");
      return;
    }

    setIsSearching(true);
    
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyBfO-Uet3ZbMeTXqkQmUgIqhvPlimIXX5Q`
      );
      
      const bookData = res.data.items?.[0]?.volumeInfo;
      if (bookData) {
        setValue("title", bookData.title || "");
        setValue("author", bookData.authors?.[0] || "");
        setValue("description", bookData.description || "");
        setValue("pages", bookData.pageCount || "");
        if (bookData.imageLinks?.thumbnail) {
          setApiThumbnail(bookData.imageLinks.thumbnail);
        }
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setTimeout(() => setIsSearching(false), 2000);
    }
  };

  return (
    <>
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 py-10 px-4"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.1)" }}
          >
            <div className="bg-red-600 py-4 px-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Add Your Book Details
              </h2>
            </div>

            <div className="p-6 md:p-8">
              <ImageUploader images={images} setImages={setImages} />

              <AnimatePresence>
                {apiThumbnail && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 border-2 border-red-200 rounded-lg overflow-hidden w-24 h-32"
                  >
                    <img
                      src={apiThumbnail}
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6">
                <label className="block text-lg font-medium text-red-800 mb-1">
                  Summary
                </label>
                <textarea
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                    errors.description ? "border-red-500" : "border-red-200"
                  }`}
                  rows={4}
                  {...register("description", {
                    required: true,
                    minLength: 10,
                    maxLength: 2000,
                  })}
                  placeholder="Enter book description..."
                />
                {errors.description && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm mt-1"
                  >
                    Please enter a valid description (10-1000 characters)
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    Author
                  </label>
                  <input
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      errors.author ? "border-red-500" : "border-red-200"
                    }`}
                    type="text"
                    {...register("author", { required: true })}
                  />
                  {errors.author && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      Author name is required
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    Book Title
                  </label>
                  <input
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      errors.title ? "border-red-500" : "border-red-200"
                    }`}
                    type="text"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      Book title is required
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    Pages
                  </label>
                  <input
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      errors.pages ? "border-red-500" : "border-red-200"
                    }`}
                    type="number"
                    {...register("pages", { required: true })}
                  />
                  {errors.pages && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      Please enter page count
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    Price (₹)
                  </label>
                  <input
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      errors.price ? "border-red-500" : "border-red-200"
                    }`}
                    type="number"
                    step="0.01"
                    {...register("price")}
                  />
                  {errors.price && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      Please enter a valid price
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    ISBN Number
                  </label>
                  <div className="flex">
                    <input
                      className={`flex-1 p-2 border-l border-t border-b rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                        errors.isbn ? "border-red-500" : "border-red-200"
                      }`}
                      type="text"
                      placeholder="Enter ISBN"
                      {...register("isbn", { required: true })}
                    />
                    <motion.button
                      type="button"
                      onClick={handleSearch}
                      disabled={isSearching}
                      className={`px-4 py-2 rounded-r-lg flex items-center justify-center ${
                        isSearching ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                      } text-white transition-colors`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSearching ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <IoMdSearch className="mr-1" />
                          Search
                        </>
                      )}
                    </motion.button>
                  </div>
                  {errors.isbn && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      ISBN is required
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg font-medium text-red-800 mb-1">
                  Genre
                </label>
                <Controller
                  name="genre"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={genreOptions}
                      className="mt-1"
                      classNamePrefix="select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: errors.genre ? "#ef4444" : "#fecaca",
                          minHeight: "42px",
                          "&:hover": {
                            borderColor: errors.genre ? "#ef4444" : "#fca5a5",
                          },
                        }),
                        option: (styles, { isFocused, isSelected }) => ({
                          ...styles,
                          backgroundColor: isSelected
                            ? "#ef4444"
                            : isFocused
                            ? "#fee2e2"
                            : "white",
                          color: isSelected ? "white" : "#991b1b",
                        }),
                        multiValue: (styles) => ({
                          ...styles,
                          backgroundColor: "#fee2e2",
                        }),
                        multiValueLabel: (styles) => ({
                          ...styles,
                          color: "#991b1b",
                        }),
                        multiValueRemove: (styles) => ({
                          ...styles,
                          color: "#991b1b",
                          ":hover": {
                            backgroundColor: "#ef4444",
                            color: "white",
                          },
                        }),
                      }}
                    />
                  )}
                />
                {errors.genre && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm mt-1"
                  >
                    Please select at least one genre
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    Book Condition
                  </label>
                  <select
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      errors.condition ? "border-red-500" : "border-red-200"
                    }`}
                    {...register("condition", { required: true })}
                  >
                    <option value="">Select condition</option>
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                  </select>
                  {errors.condition && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      Please select condition
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-red-800 mb-1">
                    Listing Type
                  </label>
                  <select
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      errors.forSaleData ? "border-red-500" : "border-red-200"
                    }`}
                    {...register("forSaleData", { required: true })}
                  >
                    <option value="">Select type</option>
                    <option value="rent">Rent</option>
                    <option value="sell">Sell</option>
                  </select>
                  {errors.forSaleData && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      Please select listing type
                    </motion.p>
                  )}
                </div>
              </div>

              <motion.div 
                className="mt-8 flex justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Submit Book
                </button>
              </motion.div>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddBook;