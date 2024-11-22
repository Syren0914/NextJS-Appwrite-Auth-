import { Client, Databases, Account } from "node-appwrite";
import db from "./database";

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const databases = new Databases(client);

// Function to create the admin client
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

// Function to create a client with session-based authentication
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

// Function to create a new user
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

// Function to handle booking submission to the Appwrite database
const handleBookingSubmit = async ({ selectedServices, selectedDate, selectedTime, userId }) => {
    const { databases } = await createAdminClient();

    const bookingData = {
        customerId: userId, // Store userId in booking data
        services: selectedServices,
        date: selectedDate ? selectedDate.toISOString() : null, // Convert to ISO only if defined
        time: selectedTime,
        createdAt: new Date().toISOString(),
    };

    try {
        console.log(bookingData)
        const response = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID, // Replace with your Appwrite database ID
            process.env.NEXT_PUBLIC_COLLECTION_ORDERS, // Replace with your Appwrite collection ID
            'unique()', // Use 'unique()' to auto-generate a document ID
            bookingData
        );

        alert('Booking successful!');
    } catch (error) {
        console.error('Error creating booking:', error);
        alert('Failed to create booking. Please try again.');
    }
};

export { createAdminClient, createSessionClient, createUser, handleBookingSubmit , databases };
