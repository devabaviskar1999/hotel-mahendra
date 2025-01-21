import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    productName: "",
    qty: 0,
    unit: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState({});
  const onChanger = (e) => {
    const { value, name } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    setSuccess("");
    const productName = value.productName;
    const qty = value.qty;
    const unit = value.unit;
    try {
      const response = await axios.post(
        "http://localhost:4000/product/purchased",
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
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <div className="home">
      <div className="form-div">
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
            <option value="">Select</option>
            <option value="gram">Gram</option>
            <option value="bottle">Bottle</option>
            <option value="packet">Packet</option>
          </select>
          <button type="submit">Add</button>
        </form>
        {alertMessage ? (
          <span className="text-red-500">{alertMessage}</span>
        ) : null}
        {success.message ? (
          <span className="text-green-500">{success.message}</span>
        ) : null}
      </div>
      <div>
        <ul>
          {success?.qty ? (
            <span className="bold text-2xl">{success.qty}</span>
          ) : null}{" "}
          {success?.unit ? (
            <span>
              {success.qty > 1 ? success.unit + "s" : success.unit} of{" "}
              <span className="text-amber-700 uppercase font-bold">
                {success.productName}
              </span>{" "}
              in stock
            </span>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Home;
