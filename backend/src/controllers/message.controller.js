import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUserForSidebar = async (req, res) => {
//   const { fullName, email, password } = req.body;
  try {
    const loggedInUserId = req.user._id;
    const filterdUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    res.status(200).json(filterdUser)

   
  } catch (error) {
    console.log("Error in getUser", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages =async (req,res)=>{
try {
const { id:userToChatId }= req.params
const MyId=req.user._id

  const messages =await Message.find({
    $or:[
        {senderId:MyId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:MyId}
    ]
  })
  res.status(200).json(messages)
} catch (error) {
  console.log("error in getmessages",error.message)
  return res.status(500).json({message:"internal server error"})
}
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image, video } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl, videoUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        resource_type: "image", // Ensures only images are uploaded
      });
      imageUrl = uploadResponse.secure_url;
    }

    if (video) {
      const uploadResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video", 
      });
      videoUrl = uploadResponse.secure_url;
    }

    
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      video: videoUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
