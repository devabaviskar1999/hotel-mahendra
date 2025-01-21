import React, { useState } from "react";
import axios from "axios";
const Home = () => {
  const [value, setValue] = useState({
    productName: "",
    qty: 0,
    unit: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const onChanger = (e) => {
    const { value, name } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productName = value.productName;
    const qty = value.qty;
    const unit = value.unit;
    try {
      const response = await axios.post(
        "http://localhost:4000/product/purchased",
        {
          productName,
          qty,
          unit
        },
        { withCredentials: true }
      );
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter product name"
          name="productName"
          autoFocus
          value={value.productName}
          onChange={onChanger}
        />
        <input
          type="number"
          placeholder="qty"
          name="qty"
          value={value.qty}
          onChange={onChanger}
        />
        {/* <input type="text" placeholder='Enter product name' name='productName' autoFocus value={value.unit} onChange={onChanger} /> */}
        <select name="unit" value={value.unit} onChange={onChanger}>
          <option value="gram">Gram</option>
          <option value="bottle">Bottle</option>
          <option value="packet">Packet</option>
        </select>
        <button type="submit">Add</button>
      </form>
      {alertMessage ? <span>{alertMessage}</span> : null}
    </div>
  );
};

export default Home;
