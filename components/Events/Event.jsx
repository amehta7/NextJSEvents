import React from 'react'
import classes from './event.module.css'
import UIButton from '../UI/UIButton'
import DateIcon from '../icons/date-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import AddressIcon from '../icons/address-icon'
import Image from 'next/image'

const Event = ({ event }) => {
  const redableDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedAddress = event.location.replace(', ', '\n')

  return (
    <li className={classes.item}>
      <Image
        src={'/' + event.image}
        alt={event.title}
        width={250}
        height={160}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{redableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <UIButton link={`/events/${event.id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </UIButton>
        </div>
      </div>
    </li>
  )
}

export default Event
