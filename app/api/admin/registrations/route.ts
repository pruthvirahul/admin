import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    const collection = db.collection("registrations")

    const registrations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Convert _id to string for frontend safety
    const cleaned = registrations.map((reg) => ({
      ...reg,
      _id: reg._id.toString(),
    }))

    return NextResponse.json(cleaned)
  } catch (error) {
    console.error("Admin Fetch Error:", error)

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    )
  }
}