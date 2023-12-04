import {api, requestConfig} from "../utils/config"

const register = async(data) => {


    const config = requestConfig("POST", data);

    try{

        
        const res = await fetch(api + "/users/register", config).then((res) => res.json()).catch((error) => error);
        

        if(!(res.errors)){
            localStorage.setItem("user", JSON.stringify(res));
        }

        return res;



    }catch(error){
        console.log(error);
    }
}


//logout an user
const logout = async() => {
    localStorage.removeItem("user");
}


//Sign in an user
const login = async(data) => {

    const config = requestConfig("POST", data);

    try{

        const res = await fetch(api + "/users/login", config).then((res) => res.json()).catch((error) => error);

        if(!(res.errors)){
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res;
    }catch(error){
        console.log(error);
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService;