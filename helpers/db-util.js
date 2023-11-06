import { MongoClient } from 'mongodb'

export const connectToDB = async () => {
  //console.log(process.env.NEXT_PUBLIC_DB_USERNAME)

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.a0wzikd.mongodb.net/NEXTJS_EVENTS_API?retryWrites=true&w=majority`
  )

  return client
}

export const insertDocumentToDB = async (client, collection, document) => {
  const db = client.db()

  const result = await db.collection(collection).insertOne(document)

  return result
}

export const getAllDocuments = async (
  client,
  collection,
  IdFilter,
  sortFilter
) => {
  const db = client.db()

  const result = await db
    .collection(collection)
    .find(IdFilter)
    .sort(sortFilter)
    .toArray()

  return result
}
