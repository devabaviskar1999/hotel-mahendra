import Purchased from "../models/product.js";

export const purchased = async (req, res) => {
  const { productName, qty, unit } = req.body;
  if (!productName || !qty || !unit) {
    return res.status(401).json({ message: "invalid input data" });
  }
  try {
    const productExist = await Purchased.findOne({ productName });
    if (!productExist) {
      const newProduct = new Purchased({ productName, qty, unit });
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
    const productExist = await Purchased.findOne({ productName });
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
  console.log("stock", stock)
  return res.status(200).send(stock);
};
