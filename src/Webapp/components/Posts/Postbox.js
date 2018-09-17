import React from 'react'
import {Card} from 'antd'
import './Postbox.css'

const postbox = ({username, title, content, timestamp, postId}) => {
  const deletePost = async () => {
    await fetch(`http://localhost:1234/api/deletepost/${postId}`, {
      method: 'DELETE',
    })
  }

  const editPost = async () => {
    await fetch(`http://localhost:1234/api/editpost/${postId}`, {
      method: 'PUT',
    })
  }
  return (
    <Card title={username} extra={<p>{timestamp}</p>} style={{width: 300}}>
      <h3>{title}</h3>
      <p style={{float: 'left'}}>{content}</p>
      <a id="delete" onClick={deletePost}>
        Delete
      </a>
      <a id="edit" onClick={editPost}>
        Edit
      </a>
    </Card>
  )
}

export default postbox
