import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

export const useAuth = () => {

    const {user, success} = useSelector((state) => state.auth);
    

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        console.log(user)
        if(user && !('errors' in user)){
            setAuth(true);
        }
        else{
            setAuth(false);
        }

        setLoading(false);
    }, [user, success])

    return {auth, loading}
}