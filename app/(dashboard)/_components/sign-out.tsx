'use client'

import { signOut } from "next-auth/react"

const SignOut = () => {
  return (
    <button onClick={() => signOut()}>
      Log out
    </button>
  )
}

export default SignOut
