import userModel from "../Model/userModel.js";

// add item from cart
const addToCart = async (req, res) => {
    try {
      // Find user by userId
      let userData = await userModel.findOne({ _id: req.body.userId });
  
      // Get the cart data from userData
      let cartData = userData.cartData;
  
      // Check if item exists in cart, if not set to 1, else increment quantity
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1; // Initialize quantity
      } else {
        cartData[req.body.itemId] += 1; // Increment quantity
      }
  
      // Update the user's cart in the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  
      // Send success response
      res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };
  

//remove item from cart

const removeFromCart = async (req, res) => {
try {
  let userData =await userModel.findById(req.body.userId)
  let cartData=await userData.cartData;
  if (cartData[req.body.itemId]>0) {
    cartData[req.body.itemId]-=1;
  }

  await userModel.findByIdAndUpdate(req.body.userId,{cartData})
  res.json({success:true,message:"Removed from Cart"})
} catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})
}
 
};

//fetch user cart data

const getCart = async (req, res) => {
  try {
    let userData=await userModel.findById(req.body.userId)
    let cartData=await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error)
  res.json({success:false,message:"Error"})
  }
};

export { addToCart, removeFromCart, getCart };
