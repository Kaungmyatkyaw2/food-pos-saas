"use client"

import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const Home = () => {

  const { data } = useSession()

  console.log(data)

  return (
    <div>
      <button onClick={() => { signIn("google") }}>{JSON.stringify(data)}</button>
    </div>
  )
}

export default Home