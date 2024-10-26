import { createSessionClient, createAdminClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "../../appwrite/config";

export async function GET(request) {
    const sessionCookie = cookies().get("session");
    if (!sessionCookie) {
        return NextResponse.json({ message: "Session cookie not found" }, { status: 401 });
    }
    
    try {
        const { databases } = await createSessionClient(sessionCookie.value);
        
        // Fetching orders from the Appwrite database
        const { documents: orders, total: amount } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_COLLECTION_ORDERS
        );
        
        return NextResponse.json({ orders, amount }, { status: 200 });
    } catch (error) {
        console.error("Detailed Error:", error);
        return NextResponse.json({ message: "Access DENIED" }, { status: 500 });
    }
}



export async function POST(req, res) {
  try {
    const { name, email, password, phone } = await req.json();
    
    // Call the createUser function
    const user = await createUser({ name, email, password, phone });
    
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
