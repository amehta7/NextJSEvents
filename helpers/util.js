export const getAllEvents = async () => {
  const res = await fetch(
    'https://nextjs-events-7c71b-default-rtdb.firebaseio.com/events.json'
  )

  const data = await res.json()

  //console.log(data)

  let eventsData = []

  for (let key in data) {
    eventsData.push({
      id: key,
      ...data[key],
    })
  }
  return eventsData
}

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents()

  return allEvents.filter((event) => event.isFeatured)
}

export const getEventById = async (id) => {
  const allEvents = await getAllEvents()

  return allEvents.find((event) => event.id === id)
}

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter
  const allEvents = await getAllEvents()

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}
