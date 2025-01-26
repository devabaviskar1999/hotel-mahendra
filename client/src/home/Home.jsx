import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    productName: "",
    qty: "",
    unit: "",
  });
  // const [noItemFound, setItemFound] = useState("");
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState({});
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const ref = useRef();
  const fetchSuggestions = async (suggestionsValue) => {
    const { data } = await axios(
      `${server_url}/product/suggestions?q=${suggestionsValue}`,
      { withCredentials: true }
    );
    setSuggestions(data);
  };
  console.log(suggestions);
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  const onChanger = (e) => {
    //!onchanger function
    const { value, name } = e.target;
    if (name === "productName") {
      if (value.trim().length > 0) {
        debouncedFetch(value);
      } else {
        setSuggestions([]);
      }
    }

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    //!form handler function
    e.preventDefault();
    setAlertMessage("");
    setSuccess("");
    const productName = value.productName;
    const qty = value.qty;
    const unit = value.unit;
    try {
      const response = await axios.post(
        `${server_url}/product/purchased`,
        {
          productName,
          qty,
          unit,
        },
        { withCredentials: true }
      );

      if (response) {
        setSuccess(response.data);
        setValue({ productName: "", qty: 0, unit: "" });
        ref.current.focus();
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <div className="home flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Purchased Page</h1>

      <div className="form-div bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={ref}
              type="text"
              placeholder="Enter product name"
              name="productName"
              autoFocus
              value={value.productName}
              onChange={onChanger}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setValue((prev) => ({
                        ...prev,
                        productName: item.productName,
                      }));
                      setSuggestions([]); // Clear suggestions on select
                    }}
                  >
                    {item.productName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Quantity"
              name="qty"
              value={value.qty}
              onChange={onChanger}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <select
              name="unit"
              value={value.unit}
              onChange={onChanger}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Unit</option>
              <option value="gram">Gram</option>
              <option value="bottle">Bottle</option>
              <option value="packet">Packet</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
          >
            Add Product
          </button>
        </form>
        {alertMessage && (
          <span className="text-red-500 text-center block mt-4">
            {alertMessage}
          </span>
        )}
        {success.message && (
          <span className="text-green-500 text-center block mt-4">
            {success.message}
          </span>
        )}
      </div>

      {success?.qty && success?.unit && (
        <div className="mt-6 text-center">
          <ul>
            <li className="text-xl font-bold text-green-600">
              {success.qty} {success.unit}
              {success.qty > 1 ? "s" : ""} of{" "}
              <span className="text-amber-700 font-semibold">
                {success.productName}
              </span>{" "}
              in stock.
            </li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white py-4 w-full text-center">
        <p>&copy; 2025 Hotel Mahendra. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
