'use client'

import React, { useState } from 'react'

export default function LoginPage() {
    const [count ,setCount] = useState(0)


  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Login</h1>
      {count}
      <button onClick={()=> setCount(count+1)}>add</button>
    </main>

  )
}
