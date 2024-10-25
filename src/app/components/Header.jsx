import React from 'react'
import auth from '@/auth'

const Header = async () => {
    const user = await auth.getUser()
  return (
    <header><>{user && (<strong>Hello {user?.name || user.email}</strong>)}</>
        <div>
            <form action={auth.deleteSession}>
                <button>
                    Logout
                </button>
            </form>
        </div>
    </header>
  )
}
export default Header;