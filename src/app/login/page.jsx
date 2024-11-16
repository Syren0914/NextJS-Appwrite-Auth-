import React from 'react'
import { createAdminClient } from "../../appwrite/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import auth from "../../auth";
import { Leaf, Lock } from 'lucide-react'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const newstyle = async () => {
    const user = await auth.getUser();

    if (user) {
        redirect('/');
    }
    
  return (
    <div>
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left column with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Leaf className="mx-auto h-12 w-12 text-[#C7AD7F]" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Glow Organic Skincare</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form className="mt-8 space-y-6" action={auth.createSession}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email-address" className="sr-only">Email address</Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-t-md"
                  placeholder="Email address"
                  defaultValue={"erdenebatbayar3@gmail.com"} 
                  
                  
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-b-md"
                  placeholder="Password"
                  defaultValue={"12345678"} 
                  
                  
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              

              <div className="text-sm">
                <a href="#" className="font-medium text-[#C7AD7F] hover:text-[#B69E6B]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#C7AD7F] hover:bg-[#B69E6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C7AD7F]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-[#B69E6B] group-hover:text-[#A68D5B]" aria-hidden="true" />
                </span>
                Sign in
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-[#C7AD7F] hover:text-[#B69E6B]">
              Don't have an Account ? Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Right column with image */}
      <div className="hidden lg:block w-full lg:w-1/2 relative">
        <Image
          src="/favicon.ico"
          alt="Skincare products and treatments"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-[#C7AD7F] bg-opacity-20"></div>
      </div>
    </div>
    </div>
  )
}

export default newstyle