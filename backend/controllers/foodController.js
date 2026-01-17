
import foodModel from "../models/foodModel.js";
import fs from 'fs'
// Add food item
const addFood = async (req, res) => {
  try {
    // First, check if file was uploaded
    if (!req.file) {
      console.error("No file uploaded in request");
      return res.status(400).json({ 
        success: false, 
        message: "Please upload an image file" 
      });
    }

    

    let image_filename = req.file.filename;

    // Validate required fields
    if (!req.body.name || !req.body.price) {
      return res.status(400).json({ 
        success: false, 
        message: "Name and price are required" 
      });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description || "",
      price: req.body.price,
      category: req.body.category || "",
      image: image_filename
    });

    await food.save();
    
    res.json({ 
      success: true, 
      message: "Food Added Successfully",
      data: food 
    });
    
  } catch (error) {
    console.error("Error in addFood:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: error.message 
    });
  }
}

//all food list

const listFood = async(req,res)=>{
  try{
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//remove food item 
const removeFood = async(req,res) =>{
    try{
      const food = await foodModel.findById(req.body.id)
      fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food Removed"})
    }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}

export { addFood,listFood,removeFood };