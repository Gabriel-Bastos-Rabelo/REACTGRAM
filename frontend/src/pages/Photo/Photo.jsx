import React from 'react'
import "./Photo.css"

import { uploads } from '../../utils/config'


//components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem'

//hooks
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


//redux
import { getPhoto } from '../../slices/photoSlice'


function Photo() {

    const {id} = useParams();

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const {photo, error, loading, message} = useSelector((state) => state.photo);

    //comentarios


    //load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id])


    //likes e comentarios

    if(loading){
        return <p>Carregando...</p>
    }

    console.log(photo)
  return (
    <div id="photo">
        <PhotoItem photo={photo}></PhotoItem>
    </div>
  )
}

export default Photo