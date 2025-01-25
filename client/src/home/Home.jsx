import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    productName: "",
    qty: "",
    unit: "",
  });
  const ref = useRef();
  // const [noItemFound, setItemFound] = useState("");
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState({});

  const onChanger = (e) => {
    //!onchanger function
    const { value, name } = e.target;

    console.log("name :", name);
    console.log("value :", value);
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
          <div>
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
