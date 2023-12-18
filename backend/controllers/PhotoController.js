const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");


const insertPhoto = async (req, res) => {
  const { title } = req.body;

  
  const image = req.file.filename;

  

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  

  // Create photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    username: user.name,
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
  const { id } = req.params;
  

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    const reqUser = req.user;

    //check if photo exits

    if (!photo) {
      res.status(422).json({
        errors: ["Foto não encontrada"],
      });
      return;
    }

    //check if photo belongs to user
    if (!(photo.userId.equals(reqUser._id))) {
      res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde"] });
      return

    }

    await Photo.findByIdAndDelete(photo._id);
    res.status(200).json({ id: photo._id, message: "Foto deletada com sucesso!" });
    return

  } catch (error) {
    res.status(422).json({
      errors: ["Foto não encontrada"],
    });
    return;
  }

}

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();
  return res.status(200).json(photos);


}

const getUserPhotos = async (req, res) => {
  const {id} = req.params;
  try{
    const userPhotos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();
    return res.status(200).json(userPhotos);

  }catch(error){
    res.status(404).json({errors: ["Usuário não encontrado!"]});
    return;
  }
  
}

const updatePhoto = async(req, res) => {
  const {id} = req.params;
  try{
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    const reqUser = req.user;
    const {title} = req.body;

    if(!photo){
      res.status(404).json({errors: ["Foto não encontrada"]});
      return;
    }
    

    //check if photo belongs to user
    if(!(photo.userId.equals(reqUser._id))){
      res.status(422).json({errors: ["Houve um erro, tente novamente mais tarde"]});
      return;
    }

    if(title){
      photo.title = title;
    }

    await photo.save();
    res.status(200).json({photo, message: "Foto atualizada com sucesso!"});

  }catch(error){
    return res.status(404).json({errors: ["Foto não encontrada"]});
  }
  
}

const likePhoto = async(req, res) => {
  const {id} = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);



  if(!photo){
    res.status(404).json({errors: ["Houve um erro, tente novamente mais tarde"]});
    return;
  }

  //check if use already like the photo
  if(photo.likes.includes(reqUser._id)){
    res.status(422).json({errors: ["Você já curtiu a foto"]});
    return;
  }

  photo.likes.push(reqUser._id);
  await photo.save();
  res.status(200).json({photoId: id, userId: reqUser._id,  message: "Foto curtida com sucesso"});
  return;


}

const commentPhoto = async(req, res) => {

  const {comment} = req.body;
  const {id} = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);
  const user = await User.findById(reqUser._id);

  if(!photo){
    res.status(404).json({errors: ["Houve um erro, tente novamente mais tarde"]});
    return;
  }


  
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id
  }

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({userComment, message: "Foto comentada com sucesso"});
  return;

}

const searchPhoto = async(req, res) => {

  console.log("chegou aqui")
  const {q} = req.query;

  const photos = await Photo.find({title: new RegExp(q, "i")}).exec();

  res.status(200).json(photos);
  return;
}


const getPhotoById = async(req, res) => {
  const {id} = req.params;
  const photo = await Photo.findById(id);


  if(!photo){
    res.status(404).json({errors: ["Foto não encontrada"]});
    return;
  }

  return res.status(200).json(photo);

}


module.exports = { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, updatePhoto, likePhoto, commentPhoto, searchPhoto, getPhotoById};