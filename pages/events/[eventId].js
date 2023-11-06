import React from 'react'
import { useRouter } from 'next/router'
import { getEventById, getAllEvents } from '../../helpers/util'
import EventSummary from '../../components/Event-Detail/EventSummary'
import ErrorAlert from '../../components/UI/ErrorAlert'
import EventLogistics from '../../components/Event-Detail/EventLogistics'
import EventContent from '../../components/Event-Detail/EventContent'
import Head from 'next/head'
import Comments from '../../components/Input/Comments'

const SingleEvent = ({ event }) => {
  //const router = useRouter()
  //console.log(router.query.eventId)

  //const event = getEventById(router.query.eventId)

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </React.Fragment>
  )
}

export const getStaticProps = async (context) => {
  const { params } = context
  const eventId = params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      event: event,
    },
    revalidate: 30, //seconds
  }
}

export const getStaticPaths = async () => {
  const allEvents = await getAllEvents()

  const paths = allEvents.map((e) => ({ params: { eventId: e.id } }))

  return {
    paths: paths,
    fallback: true,
  }
}

export default SingleEvent
