import React from 'react'
import "./Search.css"

//components
import PhotoItem from '../../components/PhotoItem'
import LikeContainer from '../../components/LikeContainer'
import { Link } from 'react-router-dom'
//hooks
import { useQuery } from '../../../hooks/useQuery'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import { useResetComponentMessage } from '../../../hooks/useResetComponentMessage';

//redux
import { searchPhotos } from '../../slices/photoSlice';



function Search() {

    const query = useQuery();
    const search = query.get("q");
    const {photos, loading} = useSelector((state) => state.photo)
    const {user} = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);


    useEffect(() => {
        dispatch(searchPhotos(search));
    }, [dispatch, search])


    const handleLike = (photo) => {
        dispatch(like(photo._id));
    
        resetMessage();
        
    }
    
    
    if(loading){
        return <p>Carregando...</p>
    }

    console.log(photos)
    console.log(search)
  return (
    <div id="search">
        <h2>Você está buscando por: {search}</h2>
        {photos && photos.map((photo) => {return (<div key={photo._id}>
        <PhotoItem photo={photo}/>
        <LikeContainer photo={photo} user={user} handleLike={handleLike}/> 
        <Link className='btn' to = {`/photos/${photo._id}`}>Ver mais</Link>
      </div>)})}


    </div>
  )
}

export default Search