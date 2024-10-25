import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = async ({ url, method }) => {
    try {
        const sessionCookie = cookies().get("session");
        const headers = sessionCookie ? { Cookie: `session=${sessionCookie.value}` } : {};

        return await axios({
            url,
            method,
            headers,
        });
    } catch (error) {
        console.error("Axios request error:", error.response?.data || error.message);
        throw error; // Re-throw error to handle in `Home`
    }
};




export default axiosInstance