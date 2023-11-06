import React from 'react'
import Event from './Event'
import classes from './eventList.module.css'

const EventList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map((e) => (
        <Event event={e} key={e.id} />
      ))}
    </ul>
  )
}

export default EventList
