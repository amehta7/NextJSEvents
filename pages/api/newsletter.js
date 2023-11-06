import { connectToDB, insertDocumentToDB } from '../../helpers/db-util'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address!!!' })
      return
    }

    let client

    try {
      client = await connectToDB()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the Database failed!!!' })
      return
    }

    try {
      await insertDocumentToDB(client, 'newsletter', { email: email })

      client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!!!' })
      return
    }

    //console.log(email)
    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handler
