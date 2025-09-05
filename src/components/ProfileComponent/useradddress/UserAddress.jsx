import { useState , useEffect} from "react";
import {
  PlusIcon,
  TrashIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config";

export default function AddDeliveryAddress() {
  const [addresses, setAddresses] = useState([
    { id: Date.now(), address: "", locality: "", pin: "", city: "", state: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: null, message: "" });
  const email = localStorage.getItem("userEmail");
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/get-address`, {
          method: "POST", // Changed from GET to POST to send email in body
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.address)) {
          setAddresses(data.address.map((addr, i) => ({ id: Date.now() + i, ...addr })));
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
      }
    };
  
    if (email) fetchAddresses();
  }, [email]);

  
  

  const handleAddressChange = (id, field, value) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr))
    );
  };

  const addNewAddress = () => {
    if (addresses.length < 3) {
      setAddresses((prev) => [
        ...prev,
        {
          id: Date.now(),
          address: "",
          locality: "",
          pin: "",
          city: "",
          state: "",
        },
      ]);
    }
  };

  // const deleteAddress = (id) => {
  //   if (addresses.length > 1) {
  //     setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  //   }
  // };

  
  const deleteAddress = async (id, index) => {
    if (addresses.length <= 1) return;
  
    const updated = addresses.filter((addr) => addr.id !== id);
    setAddresses(updated);
  
    // Call delete route
    try {
      await fetch(`${API_URL}/api/delete-address`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, index }),
      });
    } catch (err) {
      console.error("Failed to delete from DB", err);
    }
  };



  const saveAddresses = async () => {
    setIsSubmitting(true);
    setSaveStatus({ success: null, message: "" });

    try {
      const res = await fetch(`${API_URL}/api/save-addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, addresses }),
      });

      const data = await res.json();
      if (res.ok) {
        setSaveStatus({
          success: true,
          message: "Addresses saved successfully!",
        });
      } else {
        setSaveStatus({
          success: false,
          message: data.message || "Failed to save addresses",
        });
      }
    } catch (err) {
      setSaveStatus({
        success: false,
        message: "Network error. Please try again.",
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSaveStatus({ success: null, message: "" }), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 mt-8 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg border border-red-100"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-red-700 mb-2">
          Delivery Addresses
        </h2>
        <p className="text-red-500">Manage your shipping locations</p>
      </motion.div>

      <div className="space-y-6">
        <AnimatePresence>
          {addresses.map((addr, index) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="relative space-y-4 border-2 border-red-200 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-3 -left-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              {addresses.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteAddress(addr.id, index)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md"
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              )}

              <div className="flex items-start gap-3">
                <div className="pt-3">
                  <MapPinIcon className="w-6 h-6 text-red-400" />
                </div>
                <textarea
                  value={addr.address}
                  onChange={(e) =>
                    handleAddressChange(addr.id, "address", e.target.value)
                  }
                  placeholder="Street Address"
                  rows="2"
                  className="w-full p-3 text-base border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    value={addr.locality}
                    onChange={(e) =>
                      handleAddressChange(addr.id, "locality", e.target.value)
                    }
                    placeholder="Locality"
                    className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    value={addr.pin}
                    onChange={(e) =>
                      handleAddressChange(addr.id, "pin", e.target.value)
                    }
                    placeholder="PIN Code"
                    className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <BuildingOfficeIcon className="w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    value={addr.city}
                    onChange={(e) =>
                      handleAddressChange(addr.id, "city", e.target.value)
                    }
                    placeholder="City"
                    className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    value={addr.state}
                    onChange={(e) =>
                      handleAddressChange(addr.id, "state", e.target.value)
                    }
                    placeholder="State"
                    className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center mt-10 space-y-4">
        <motion.button
          onClick={addNewAddress}
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={addresses.length >= 3}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            addresses.length >= 3
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600 shadow-md"
          }`}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New Address</span>
        </motion.button>

        {addresses.length >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm"
          >
            Maximum 3 addresses allowed
          </motion.p>
        )}

        <AnimatePresence>
          {saveStatus.success !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                saveStatus.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {saveStatus.success ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <XCircleIcon className="w-5 h-5" />
              )}
              <span>{saveStatus.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={saveAddresses}
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 shadow-md transition-all disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-5 h-5" />
              <span>Save All Addresses</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
