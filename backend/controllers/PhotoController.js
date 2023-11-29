const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");


const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;
  
    console.log(req.body);
  
    const reqUser = req.user;
  
    const user = await User.findById(reqUser._id);
  
    console.log(user.name);
  
    // Create photo
    const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
    });
  
    // If user was photo sucessfully, return data
    if (!newPhoto) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }
  
    res.status(201).json(newPhoto);
  };


const deletePhoto = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    const reqUser = req.user;

    //check if photo exits

    if(!photo){
      res.status(422).json({
        errors: ["Foto não encontrada"],
      });
      return;
    }

    //check if photo belongs to user
    console.log(photo.userId)
    if(!(photo.userId.equals(reqUser._id))){
      res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde"]});
      return

    }

    await Photo.findByIdAndDelete(photo._id);
    res.status(200).json({id: photo._id, message: "Foto deletada com sucesso!"});
    return

}
module.exports = {insertPhoto, deletePhoto}