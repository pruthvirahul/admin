
import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Enter valid phone number" },
        { status: 400 }
      )
    }

    const db = await getDb()
    const collection = db.collection("registrations")

    const records = await collection
      .find({ phone })
      .sort({ createdAt: -1 })
      .toArray()

    const cleaned = records.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }))

    return NextResponse.json(cleaned)

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}