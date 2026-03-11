import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10))
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") ?? "200", 10)))
    const skip = (page - 1) * limit

    const db = await getDb()
    const collection = db.collection("registrations")

    const [registrations, total] = await Promise.all([
      collection
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments({}),
    ])

    // Convert _id to string for frontend safety
    const cleaned = registrations.map((reg) => ({
      ...reg,
      _id: reg._id.toString(),
    }))

    return NextResponse.json({ data: cleaned, total, page, limit })
  } catch (error) {
    console.error("Admin Fetch Error:", error)

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    )
  }
}