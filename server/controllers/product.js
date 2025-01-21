import Purchased from "../models/product.js"

export const purchased = async (req, res) => {
const {productName, qty, unit} = req.body
if(!productName , !qty, !unit){
    return res.status(401).json({message: "invalid input data"})
}try{
     
const productExist = await Purchased.findOne({productName})
if(!productExist){
    const newProduct = new Purchased({productName, qty, unit})
    await newProduct.save();
    return res.status(201).json({message: "Item Added Successfully!"})
}else{
    productExist.qty += qty
    await productExist.save()
   return res.status(200).json({message: "Product Updated Successfully!"})
}

}catch(error){
    return res.status(400).json({message: error.message})
}
}