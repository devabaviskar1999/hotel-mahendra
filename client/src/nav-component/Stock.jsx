import { useState } from "react";
import axios from "axios";
const Stock = () => {
  const [store, getStore] = useState([]);
  const getData = async () => {
    const data = await axios.get("http://localhost:4000/product/stock", {
      withCredentials: true,
    });
    getStore(data.data);
  };
  console.log(store.length > 1 ? store : 0);
  return (
    <div>
      <ul>
        {store.length > 0
          ? store.map((store, index) => {
              return (
                <li className="" key={index}>
                  {store.productName}
                </li>
              );
            })
          : null}
      </ul>

      <button
        onClick={() => getData()}
        className="h-9 w-9 bg-red-700 text-white"
      >
        GetData
      </button>
    </div>
  );
};

export default Stock;
