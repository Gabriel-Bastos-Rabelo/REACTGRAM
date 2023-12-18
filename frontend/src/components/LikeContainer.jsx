import React from 'react'
import "./LikeContainer.css"

import {BsHeart, BsHeartFill} from 'react-icons/bs'


function LikeContainer({photo, user, handleLike}) {

  
  return (
    <div className="like">
        
        
        {photo.likes && user && (<>{photo.likes.includes(user._id) ? (
            <BsHeartFill/>
        ) : (
            <BsHeart onClick={() => handleLike(photo)}/>
        )}
        
        <p>{photo.likes.length} Like(s)</p>
        </>)
        
        }

    </div>
  )
}

export default LikeContainer