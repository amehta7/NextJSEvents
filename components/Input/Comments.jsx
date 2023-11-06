import React, { useState, useEffect, useContext } from 'react'
import CommentList from './CommentList'
import NewComment from './NewComment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

const Comments = (props) => {
  const { eventId } = props

  const notificationCtx = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showComments) {
      setLoading(true)
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setCommentList(data.comments)
          setLoading(false)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  const addCommentHandler = async (commentData) => {
    try {
      const { email, text, name } = commentData

      notificationCtx.showNotification({
        title: 'Sending comment...',
        message: 'Your comment is currently being stored into a database.',
        status: 'pending',
      })

      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify({ email, text, name }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        await response.json()
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully stored comment.',
          status: 'success',
        })
      } else {
        const data = await response.json()

        //console.log(data)
        throw new Error(data.message || 'Something went wrong!')
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      })
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList data={commentList} />}
      {showComments && loading && <p>Loading...</p>}
    </section>
  )
}

export default Comments
