import React from 'react'
import auth from '@/auth'
import { LogOut} from "lucide-react";


const Header = async () => {
    const user = await auth.getUser()
  return (
    <header><>{user && (<strong>Hello {user?.name || user.email}</strong>)}</>
        <div>
            <form action={auth.deleteSession}>
                <button className='flex'>
                    <LogOut/>Logout
                </button>
            </form>
        </div>
    </header>
  )
}
export default Header;