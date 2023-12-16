import {api, requestConfig} from "../utils/config"



const publishPhoto = async(data, token) => {

   
    const config = requestConfig("POST", data, token, true);
    
    console.log(config)

    try{
        const res = await fetch(api + "/photo", config).then((res) => res.json()).catch((error) => console.log(error));
        
        return res;

    }catch(error){
        console.log(error)
    }


}

//get user photos

const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try{
        const res = await fetch(api + `/photo/user/${id}`, config).then((res) => res.json()).catch((error) => error);

        return res;


    }catch(error){
        console.log(error)
    }
}

//delete photo
const deletePhoto = async(id, token) => {
    const config = requestConfig("DELETE", null, token);

    try{
        const res = await fetch(api + `/photo/${id}`, config).then((res) => res.json()).catch((error) => error);
        return res;

    }catch(error){

        console.log(res)
    }
}


//update photo
const updatePhoto = async(id, data, token) => {
    const config = requestConfig("PUT", data, token);

    try{
        const res = await fetch(api + "/photo/" + id, config).then((res) => res.json()).catch((error) => error);

        return res;
    }catch(error){
        console.log(error);
    }
}


//get photo by id
const getPhoto = async(id, token) => {

    const config = requestConfig("GET", null, token);

    try{
        const res = await fetch(api + "/photo/" + id, config).then((res) => res.json()).catch((error) => error);

        return res;
    }catch(error){
        console.log(error);
    }
}

const photoService = {publishPhoto, getUserPhotos, deletePhoto, updatePhoto, getPhoto}

export default photoService;

