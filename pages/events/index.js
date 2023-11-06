import React from 'react'
import { getAllEvents } from '../../helpers/util'
import EventList from '../../components/Events/EventList'
import EventsSearch from '../../components/Events/EventsSearch'
import { useRouter } from 'next/router'
import Head from 'next/head'

const AllEvents = ({ events }) => {
  // const events = getAllEvents()

  const router = useRouter()

  const searchHandler = (year, month) => {
    router.push(`/events/${year}/${month}`)
  }

  return (
    <React.Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={searchHandler} />
      <EventList events={events} />
    </React.Fragment>
  )
}

export const getStaticProps = async () => {
  const data = await getAllEvents()
  return {
    props: {
      events: data,
    },
    revalidate: 60, //seconds
  }
}

export default AllEvents
