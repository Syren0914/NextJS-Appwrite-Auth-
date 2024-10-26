import { Client, Databases, Account } from "node-appwrite";

const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
        .setKey(process.env.NEXT_PUBLIC_API_KEY);

    return {
        account: new Account(client),
        databases: new Databases(client)
    };
};

const createSessionClient = async (session) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
    if(session){
        client.setSession(session)
    }

    return {
        account: new Account(client),
        databases: new Databases(client)
    };
};

const createUser = async ({ name, email, password, phone }) => {
    const { account } = await createAdminClient();
    
    try {
        const user = await account.create("unique()", email, password, name);

        // Optionally add phone as a custom preference (if supported)
        await account.updatePrefs({
            phone
        });

        return user;
    } catch (error) {
        console.error("User creation failed:", error);
        throw new Error("Failed to create user.");
    }
};






export { createAdminClient,createSessionClient, createUser};

