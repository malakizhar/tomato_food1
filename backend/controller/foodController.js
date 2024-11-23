import foodModel from "../Model/foodModel.js";

import fs from 'fs'
const addFood = async (req, res) => {
    try {
      // Log the incoming data for debugging
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);

      const { name, description, price, category } = req.body;
  
     
     
      const image_filename = req.file.filename;
  
      // Create a new food item
      const food = new foodModel({
        name,
        description,
        price: Number(price), // Convert price to number
        category,
        image: image_filename
      });
  
      // Save the food item to the database
      await food.save();
      res.status(201).json({ success: true, message: "Food added successfully!" });
  
    } catch (error) {
      console.error("Error adding food:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };


  const listFood=async(req,res)=>{

    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.error(" error");
        res.status(500).json({ success: false, message: "ERROR" });
    }

  }



  const removeFood=async(req,res)=>{
try{
const food =await foodModel.findById(req.body.id);
fs.unlink(`uploads/${food.image}`,()=>{})


await foodModel.findByIdAndDelete(req.body.id);
res.json({success:true,message:"Foods REmoved"})
}catch(error){
    console.error(" error");
    res.status(500).json({ success: false, message: "ERROR" });
}

  }


  
export  {addFood,listFood,removeFood};
