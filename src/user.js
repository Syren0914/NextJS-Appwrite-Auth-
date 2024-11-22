import { createSessionClient } from "@/appwrite/config";

export default async function handler(req, res) {
    try {
        const { account } = await createSessionClient(req.cookies.session);
        const user = await account.get();
        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ error: "User not authenticated" });
    }
}
