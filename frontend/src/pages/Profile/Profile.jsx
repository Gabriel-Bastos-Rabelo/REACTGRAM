import React from 'react'

import "./Profile.css"

import { uploads } from '../../utils/config';

//components
import Message from '../../components/Message'
import { Link, parsePath } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'


//hooks
import {useState, useEffect, useRef} from "react"
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom"


//redux
import { getUserDetails } from '../../slices/userSlice'

import { publishPhoto, resetMessage } from '../../slices/photoSlice';




function Profile() {


    const {id} = useParams();
    
    const dispatch = useDispatch();
    const {user, loading, error, message} = useSelector((state) => state.user);

    const {user: userAuth} = useSelector((state) => state.auth);

    const {photo, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

    const [title, setTitle] = useState();
    const [image, setImage] = useState();


    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);

    };
    


    //new photo and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        console.log(photoData)

        const formData = new FormData();

        Object.keys(photoData).forEach((key) => {
            formData.append(key, photoData[key]);
        });
    
        await dispatch(publishPhoto(formData));
    

        setTitle("");


        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);


    }


    //user data

    useEffect(() => {

        dispatch(getUserDetails(id));
    
    }, [dispatch, id])


    if(loading){
        return <p>Carregando...</p>
    }

   


  return (
    <div id = "profile">
        <div className="profile-header">
            {user.profileImage && (
                <img src = {`${uploads}/users/${user.profileImage}`} alt={user.name}></img>
            )}

            <div className="profile-description">
                        <h2>{user.name}</h2>
                        <p>{user.bio}</p>
            </div>
        </div>

        {id === userAuth._id && <>
        <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título para a foto:</span>
                    <input type="text" placeholder="Insira um título" onChange={(e) => setTitle(e.target.value)} value = {title || ""}/>

                </label>

                <label>
                    <span>Imagem:</span>
                    <input type="file" onChange={handleFile} />
                </label>

                {!loading && <input type="submit" value="Postar" />}
                {loading && <input type = "submit" disabled value = "Aguarde.."></input>}
            </form>
            
        </div></>}

       
    </div>
  )
}

export default Profile