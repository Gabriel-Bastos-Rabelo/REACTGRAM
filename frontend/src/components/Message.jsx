import "./Message.css"

import React from 'react'

function Message({message, type}) {
  return (
    <div className={`message ${type}`}>
        <p>{message}</p>
    </div>
  )
}

export default Message