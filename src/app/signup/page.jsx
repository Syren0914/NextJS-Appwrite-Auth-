import React from "react";
import { redirect } from "next/navigation";



export const metadata = {
  title: "Sign Up",
};

export default async function Page() {
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form id="signup-form"  className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Sign Up</h3>
                <p className="text-sm text-center text-gray-600 mb-8">Create an account to get started</p>
                
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name..." 
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email..." 
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">Phone:</label>
                    <input 
                        type="phone" 
                        name="email" 
                        placeholder="Enter your email..." 
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password..." 
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <input 
                        type="submit" 
                        value="Sign Up" 
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
                    />
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">Already have an account?
                      <a href="/login" className="inline-block mt-2 py-2 px-4  text-black font-semibold rounded-md hover:text-gray-500 transition duration-200">
                          Login
                      </a>
                    </p>
                </div>
            </form>
        </div>
    );
}
