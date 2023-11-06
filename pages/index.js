import React from 'react'
import { getFeaturedEvents } from '../helpers/util'
import EventList from '../components/Events/EventList'
import Head from 'next/head'
import NewsletterRegistration from '../components/Input/NewsletterRegistration'

const Home = ({ featuredEvents }) => {
  // const featuredEvents = getFeaturedEvents()

  return (
    <React.Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </React.Fragment>
  )
}

export const getStaticProps = async () => {
  const data = await getFeaturedEvents()
  return {
    props: {
      featuredEvents: data,
    },
    revalidate: 1800, //seconds
  }
}

export default Home
