import Purchased from "../models/product.js";

export const purchased = async (req, res) => {
  const { productName, qty, unit } = req.body;
  if (!productName || !qty || !unit) {
    return res.status(401).json({ message: "invalid input data" });
  }
  try { 
    const tolower = productName.toLowerCase()
    const productExist = await Purchased.findOne({ productName });
    if (!productExist) {
      const newProduct = new Purchased({ productName:tolower, qty, unit });
      await newProduct.save();
      return res.status(201).json({
        message: "Item Added Successfully!",
        qty: newProduct.qty,
        unit: newProduct.unit,
        productName: newProduct.productName,
      });
    }
    if (productExist.unit !== unit) {
      return res.status(400).json({
        message: `Product exist but change unit to ${productExist.unit}`,
      });
    } else {
      productExist.qty += Number(qty);
      await productExist.save();
      return res.status(200).json({
        message: "Product Updated Successfully!",
        qty: productExist.qty,
        unit: productExist.unit,
        productName: productExist.productName,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const sale = async (req, res) => {
  const { productName, qty, unit, employee } = req.body;
  if (!productName || !qty || !unit || !employee) {
    return res.status(401).json({ message: "invalid input data" });
  }

  try {
    const productToLower = productName.toLowerCase()
    const productExist = await Purchased.findOne({ productName: productToLower });
    if (!productExist) {
      return res.status(400).json({
        message: "Product doesn't exist in your stock",
      });
    }
    if (productExist.unit !== unit) {
      return res.status(400).json({
        message: `Product exist but change unit to ${productExist.unit}`,
      });
    } else {
      const finalMinusAmount = (productExist.qty -= Number(qty));
      if (finalMinusAmount < 0) {
        return res.status(400).json({
          message: `${productExist.productName} stock will be in ${finalMinusAmount}`,
        });
      } else {
        await productExist.save();

        return res.status(200).json({
          message: "Product Sale Updated Successfully!",
          qty: productExist.qty,
          unit: productExist.unit,
          productName: productExist.productName,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const stock = async (req, res) => {
  const stock = await Purchased.find();
  return res.status(200).json(stock);
};

export const suggestions = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(200).json({message: "No user input found"});
  }
  try {
    const result = await Purchased.find({
      productName: { $regex: query, $options: "i" },
    }).limit(2);
    
    // If no result is found, return an empty array
    if (!result || result.length === 0) {
      return res.status(200).json([]);
    }
    
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const emptyStock = async (req, res) => {
  try {
    // Use MongoDB query to find products with qty = 0
    const emptyStock = await Purchased.find({ qty: 0 });

    if (emptyStock.length === 0) {
      return res.status(200).json({ message: "No empty stock available." });
    }

    return res.status(200).json(emptyStock); // Return the filtered products
  } catch (error) {
    console.error("Error fetching empty stock:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


