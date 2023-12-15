import {api, requestConfig} from "../utils/config"

//get user details

const profile = async(data, token) => {
    const config = requestConfig("GET", data, token);
    

    try{
        const res = await fetch(api + "/users/profile", config).then((res) => res.json()).catch((error) => error);
        return res;
    }catch(error){
        console.log(error);
    }
}

const updateProfile = async(data, token) => {
    const config = requestConfig("PUT", data, token, true);

    console.log(config)
   
    try{
        const res = await fetch(api + "/users/", config).then((res) => res.json()).catch((error) => error);
        
        return res;
    }catch(error){
        console.log(error);
    }
}

const getUserDetails = async (id) => {

    const config = requestConfig("GET");

    try{

        const res = await fetch(api + "/users/" + id, config).then((res) => res.json()).catch((error) => error);

        return res;

    }catch(error){
        console.log(error);
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails
}

export default userService;