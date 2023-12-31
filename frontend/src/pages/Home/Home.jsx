import React from 'react'
import "./Home.css"

//components
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem";
import { Link } from 'react-router-dom';

//hooks
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import { useResetComponentMessage } from '../../../hooks/useResetComponentMessage';

//redux
import { getPhotos, like} from '../../slices/photoSlice';





function Home() {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {photos, loading} = useSelector((state) => state.photo)

  const resetMessage = useResetComponentMessage(dispatch);


  useEffect(() => {
    
    dispatch(getPhotos())
  }, [dispatch, user])

  console.log(photos)
  

  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
    
  }


  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      {photos && photos.map((photo) => <div key={photo._id}>
        <PhotoItem photo={photo}/>
        <LikeContainer photo={photo} user={user} handleLike={handleLike}/> 
        <Link className='btn' to = {`/photos/${photo._id}`}>Ver mais</Link>
      </div>)}

      {photos && photos.length == 0 && <div className='no-photos'>
          Ainda não há fotos publicadas, <Link to = {`/users/${user._id}`}>clique aqui</Link>
      </div>}
    </div>
  )
}

export default Home