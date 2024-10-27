import { Client, Databases, Account } from "node-appwrite";

const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
        .setKey(process.env.NEXT_PUBLIC_API_KEY);

    return {
        account: new Account(client),
        databases: new Databases(client),
    };
};

const createSessionClient = async (session) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    if (session) {
        client.setSession(session);
    }

    return {
        account: new Account(client),
        databases: new Databases(client),
    };
};

const createUser = async ({ name, email, password }) => {
    const { account } = await createAdminClient();
    
    try {
        const user = await account.create("unique()", email, password, name);
        return user;
    } catch (error) {
        console.error("Detailed Error:", error);
        throw new Error("Failed to create user.");
    }
};

const handleBookingSubmit = async ({  selectedServices, selectedDate, selectedTime }) => {
    const { databases } = await createAdminClient(); // Use createSessionClient if you need user session context
    const bookingData = {
        services: selectedServices,
        date: selectedDate ? selectedDate.toISOString() : null, // Convert to ISO only if defined
        time: selectedTime,
      };

    try {
        await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, 
                                        process.env.NEXT_PUBLIC_COLLECTION_ORDERS,
                                            'unique()', bookingData);
        alert('Booking successful!');
    } catch (error) {
        console.error('Error creating booking:', error);
        alert('Failed to create booking. Please try again.');
    }
};

export { createAdminClient, createSessionClient, createUser, handleBookingSubmit };
