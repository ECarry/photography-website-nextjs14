'use client'

import { signOut } from "next-auth/react"

const SignOut = () => {
  return (
    <button onClick={() => signOut()} className="w-full text-start">
      Log out
    </button>
  )
}

export default SignOut
