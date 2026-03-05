import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { id, verified } = await req.json()

    const db = await getDb()
    const collection = db.collection("registrations")

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified } }
    )

    return NextResponse.json({ message: "Updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}