import { createSessionClient, createAdminClient, createUser } from "@/appwrite/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Session cookie not found" }, { status: 401 });
  }
  
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    
    // Fetching orders from the Appwrite database
    const { documents: reservation, total: amount } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ORDERS
    );
    
    return NextResponse.json({ reservation, amount }, { status: 200 });
  } catch (error) {
    console.error("Detailed Error:", error);
    return NextResponse.json({ message: "Access DENIED" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, password, phone } = await request.json();
    
    // Call the createUser function
    const user = await createUser({ name, email, password, phone });
    
    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
