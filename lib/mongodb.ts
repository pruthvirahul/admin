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
  var _indexesPromise: Promise<void> | undefined
}

let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export async function getDb(dbName = "oucefest") {
  const client = await clientPromise
  const db = client.db(dbName)
  if (!global._indexesPromise) {
    global._indexesPromise = ensureIndexes(db)
  }
  await global._indexesPromise
  return db
}

async function ensureIndexes(db: ReturnType<MongoClient["db"]>) {
  const col = db.collection("registrations")
  await Promise.all([
    // Unique index on txnId prevents duplicate transactions and speeds up duplicate checks
    col.createIndex({ txnId: 1 }, { unique: true }),
    // Index on phone speeds up pass lookups
    col.createIndex({ phone: 1 }),
    // Compound index for duplicate-registration checks (phone + eventName + subEvent)
    col.createIndex({ phone: 1, eventName: 1, subEvent: 1 }),
    // Index on createdAt supports efficient sort in admin and pass queries
    col.createIndex({ createdAt: -1 }),
  ])
}

export default clientPromise