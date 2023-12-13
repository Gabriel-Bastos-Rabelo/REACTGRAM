import React from 'react'
import "./EditProfile.css"

import { uploads } from '../../utils/config';

//Hooks
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";

//redux
import {profile, resetMessage, updateProfile} from "../../slices/userSlice";

//components
import Message from "../../components/Message"



function EditProfile() {

    const dispatch = useDispatch();
    const {user, loading, error, message} = useSelector((state) => state.user);

    
    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        dispatch(profile());
    }, [dispatch])

    //fill form with user data

    useEffect(() => {

        console.log(user)
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
        }

        if(profileImage){
            userData.profileImage = profileImage;
        }

        if(bio){
            userData.bio = bio;
        }

        if(password){
            userData.password = password;
        }

        const formData = new FormData();

        Object.keys(userData).forEach((key) => {
            formData.append(key, userData[key]);
        });
    
        await dispatch(updateProfile(formData));
    

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);



    }

    const handleFile = (e) => {
        const image = e.target.files[0];

        setPreviewImage(image);

        setProfileImage(image);

    }
  return (
    <div id = "edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você</p>

        {((user && user.profileImage) || previewImage) && (
            <img className = "profile-image" src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value = {name || ""} />
            <input type="email" placeholder='E-mail' disabled value = {email || ""}/>
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" onChange={handleFile}/>
            </label>

            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value = {bio || ""} />
            </label>

            <label>
                <span>Quer alterar a sua senha?</span>
                <input type="text" placeholder='Digite sua nova senha'  onChange={(e) => setPassword(e.target.value)}/>
            </label>

            {!loading && <input type = "submit" value={"Atualizar"}></input>}
            {loading && <input type="submit" value = "Aguarde..." disabled></input>}
            {error && <Message message={error} type={"error"}></Message>}
            {message && <Message message = {message} type = {"success"}></Message>}
        </form>
    </div>
  )
}

export default EditProfile