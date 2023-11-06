import {
  connectToDB,
  getAllDocuments,
  insertDocumentToDB,
} from '../../../helpers/db-util'

const handler = async (req, res) => {
  const { eventId } = req.query

  let client

  try {
    client = await connectToDB()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the Database failed!!!' })
    return
  }

  if (req.method === 'POST') {
    const { email, text, name } = req.body

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input!!!' })
      client.close()
      return
    }

    //console.log(email, text, name)

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    try {
      await insertDocumentToDB(client, 'comments', newComment)

      //newComment._id = result.insertedId

      res.status(201).json({ message: 'Added comment!', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!!!' })
    }

    // const result = await db.collection('comments').insertOne(newComment)

    //console.log(result)
  }

  if (req.method === 'GET') {
    let allComments

    try {
      allComments = await getAllDocuments(
        client,
        'comments',
        { eventId: eventId },
        { _id: -1 }
      )
      res.status(200).json({ comments: allComments })
    } catch (error) {
      res.status(500).json({ message: 'Getting all data failed!!!' })
    }
  }

  client.close()
}

export default handler
