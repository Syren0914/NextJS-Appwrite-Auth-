import React from "react";
import { createAdminClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import auth from "@/auth";


export default async function page(){
    const user = await auth.getUser()

    if(user) {
        redirect('/')
    }


    return(
        <div >
            <form id="login-form" action={auth.createSession}>
                <h3>Login</h3>
                <p>Enter Your Information to Login</p>
                <div>
                    <label>Email:</label>
                    <input  type="email" 
                            name="email" 
                            placeholder="Enter your email..." 
                            defaultValue={"erdenebatbayar3@gmail.com"}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input  type="password" 
                            name="password" 
                            placeholder="Enter your password..." 
                            defaultValue={"12345678"}/>
                            
                </div>

                <div>
                    <input type="submit" 
                           value="Login" />
                </div>
            </form>
        </div>
    )
}