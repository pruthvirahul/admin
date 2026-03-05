import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local")
}

if (/@cluster\.mongodb\.net(?=\/|\?|$)/.test(uri)) {
  throw new Error(
    "Invalid MONGODB_URI host. Use your full Atlas SRV host (for example: cluster0.xxxxx.mongodb.net), not cluster.mongodb.net."
  )
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export async function getDb(dbName = "oucefest") {
  const client = await clientPromise
  return client.db(dbName)
}

export default clientPromise