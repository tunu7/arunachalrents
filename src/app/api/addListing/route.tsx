import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/firebase"; // Adjust the path if needed
import { collection, addDoc } from "firebase/firestore";

// Function to handle POST request
export async function POST(req: NextRequest) {
  try {
    const { title, location, price, imageUrl } = await req.json();

    if (!title || !location || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Add new listing to Firestore
    const docRef = await addDoc(collection(db, "listings"), {
      title,
      location,
      price,
      imageUrl: imageUrl || null, // Optional field
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Listing added!", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error adding listing:", error);
    return NextResponse.json({ error: "Failed to add listing" }, { status: 500 });
  }
}
