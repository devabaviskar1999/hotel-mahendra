import { useState } from "react";
import axios from "axios";

const Stock = () => {
  const [store, setStore] = useState([]);
  const [emptyStore, setEmptyStore] = useState([]);
  const [toggle, setToggle] = useState(false);
  const server_url = import.meta.env.VITE_SERVER_URL;
  const [nullToggle, setNullToggle] = useState(false);
  const getData = async () => {
    try {
      const response = await axios.get(`${server_url}/product/stock`, {
        withCredentials: true,
      });
      setStore(response.data);
      setToggle(true); // Show the table after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEmptyData = async () => {
    try {
      const response = await axios.get(`${server_url}/product/empty-stock`, {
        withCredentials: true,
      });
      setEmptyStore(response.data);
      setNullToggle(true);
    } catch (error) {
      console.error("Error fetching empty stock:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mahendra Hotel Store Stock</h1>

      {/* Toggle Button */}
      {toggle ? (
        <button
          className="mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          onClick={() => setToggle(false)} // Close button
        >
          Close
        </button>
      ) : (
        <button
          onClick={getData} // Fetch stock data
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Get Stock
        </button>
      )}

    

      {nullToggle ? (
        <button
          className="mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          onClick={() => setNullToggle(false)} // Close button
        >
          Close
        </button>
      ) : (
        <button
          className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={getEmptyData}
        >
          Get Empty Stock
        </button>
      )}

      {/* Conditional rendering for stock table */}
      {toggle && (
        <>
          {store.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1">
                      Serial No
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Product Name
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {store.map((item, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item.productName}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {item.qty + " " + item.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              No data available. Click "Get Stock" to load stock information.
            </p>
          )}
        </>
      )}

      {/* Conditional rendering for empty stock */}
      {!toggle && nullToggle && (
        <>
          {emptyStore.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1">
                      Serial No
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Product Name
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emptyStore.map((item, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item.productName}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {item.qty + " " + item.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
            {emptyStore.length === 0 && "No empty stock available."}
          </p>
          
          )}
        </>
      )}
    </div>
  );
};

export default Stock;
