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
import { useResetComponentMessage } from '../../../hooks/useResetComponentMessage'


//redux
import { comment, getPhoto, like } from '../../slices/photoSlice'
import LikeContainer from '../../components/LikeContainer'


function Photo() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);



    const {user} = useSelector((state) => state.auth)

    const {photo, error, loading, message} = useSelector((state) => state.photo);

    const [commentText, setCommentText] = useState("");

    //comentarios


    //load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id])


    

    const handleLike = () => {
      dispatch(like(photo._id))

      resetMessage();
    }


    const handleComment = (e) => {
      e.preventDefault();

      const newComment = {
        comment: commentText,
        id: photo._id
      }

      dispatch(comment(newComment))

      setCommentText("");
      resetMessage();

    }

    if(loading){
        return <p>Carregando...</p>
    }

    console.log(photo)
  return (
    <div id="photo">
        <PhotoItem photo={photo}></PhotoItem>
        <LikeContainer photo={photo} user = {user} handleLike={handleLike}/>

        <div className="message-container">
          {error && (<Message message={error} type = "error"></Message>)}
          {message && (<Message message = {message} type = "success"/>)}
        </div>

        {photo.comments && 
        <div className="comments">
        <h3>Comentários: ({photo.comments.length})</h3>
        <form onSubmit={handleComment}>

          <input type="text" placeholder='Insira o seu comentário' onChange={(e) => setCommentText(e.target.value)} value={commentText || ""}/>

          <input type="submit" value="Enviar" />
        </form>
        

      

      {photo.comments && photo.comments.length === 0 && <p>Ainda nãa há comentários</p>}


      {photo.comments && photo.comments.map((comment) => 

        
        <div className="comment" key={comment.comment}>
          <div className="author">
            {comment.userImage && <img src = {`${uploads}/users/${comment.userImage}`} alt = {comment.userName}></img>}
            <Link to = {`/user/${comment.userId}`}>
              <p>{comment.userName}</p>              
            </Link>
            
          </div>
          <p>{comment.comment}</p>
        </div>

        )
      }
      
      </div>
    }
    </div>
  )
}

export default Photo