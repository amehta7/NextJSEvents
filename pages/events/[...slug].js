import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../helpers/util'
import ErrorAlert from '../../components/UI/ErrorAlert'
import UIButton from '../../components/UI/UIButton'
import ResultsTitle from '../../components/Events/ResultsTitle'
import EventList from '../../components/Events/EventList'
import useSWR from 'swr'
import Head from 'next/head'

const FilteredEvents = () => {
  const [events, setEvents] = useState([])

  const router = useRouter()

  // console.log(router.query.slug)

  const filterData = router.query.slug

  const { data, error } = useSWR(
    'https://nextjs-events-7c71b-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  )

  useEffect(() => {
    if (data) {
      let eventsData = []

      for (let key in data) {
        eventsData.push({
          id: key,
          ...data[key],
        })
      }
      setEvents(eventsData)
    }
  }, [data])

  let headData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content='A list of filtered events.' />
    </Head>
  )

  if (!events) {
    return (
      <React.Fragment>
        {headData}
        <p className='center'>Loading...</p>
      </React.Fragment>
    )
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  headData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear}. `}
      />
    </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <React.Fragment>
        {headData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <UIButton link='/events'>Show All Events</UIButton>
        </div>
      </React.Fragment>
    )
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <React.Fragment>
        {headData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <UIButton link='/events'>Show All Events</UIButton>
        </div>
      </React.Fragment>
    )
  }

  const dateData = new Date(numYear, numMonth - 1)

  return (
    <React.Fragment>
      {headData}
      <ResultsTitle date={dateData} />
      <EventList events={filteredEvents} />
    </React.Fragment>
  )
}

// export const getServerSideProps = async (context) => {
//   const { params } = context
//   const filterData = params.slug

//   const filteredYear = filterData[0]
//   const filteredMonth = filterData[1]

//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       prps: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   }
// }

export default FilteredEvents
