import {api, requestConfig} from "../utils/config"



const publishPhoto = async(data, token) => {

   
    const config = requestConfig("POST", data, token);
    

    try{
        const res = await fetch(api + "/photo", config).then((res) => res.json()).catch((error) => error);

        return res;

    }catch(error){
        console.log(error)
    }


}
const photoService = {publishPhoto}

export default photoService;

