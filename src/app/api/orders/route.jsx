import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";

export async function GET(request) {
    const sessionCookie = cookies().get('session')
    try {
        const { databases } = await createSessionClient(sessionCookie.value);
        const { documents: orders, amount } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_COLLECTION_ORDERS
        );
        return new Response(JSON.stringify({ orders, amount }), { status: 200 });
    } catch (error) {
        console.error("Detailed Error:", error);
        return new Response(JSON.stringify({ message: "Access DENIED" }), { status: 500 });
    }
}
