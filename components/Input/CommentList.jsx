import React from 'react'
import classes from './comment-list.module.css'

const CommentList = (props) => {
  const { data } = props

  //console.log(data)

  return (
    <ul className={classes.comments}>
      {data.map((d) => (
        <li key={d._id}>
          <p>{d.text}</p>
          <div>
            By <address>{d.name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
