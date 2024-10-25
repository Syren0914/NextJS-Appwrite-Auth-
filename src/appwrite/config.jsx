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




export { createAdminClient,createSessionClient };

