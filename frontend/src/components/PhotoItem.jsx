import React from 'react'
import "./PhotoItem.css"


import { Link } from 'react-router-dom'
import { uploads } from '../utils/config'

function PhotoItem({photo}) {
  return (
    <div className='photo-item'>

        {photo.image && <img src = {`${uploads}/photos/${photo.image}`} alt={photo.title}></img>}

        <h2>{photo.title}</h2>

        <p className="photo-author">
            Publicada por: <Link to = {`/users/${photo.userId}`}>{photo.username}</Link>
        </p>
    </div>
  )
}

export default PhotoItem