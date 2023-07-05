"use client"

import React from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import { Button } from '@mui/material'

const Navbar = () => {
  const { data: session } = useSession();
  // console.log(JSON.stringify(session?.user));

  async function test(){
    const testcase = await getSession();
    console.log(JSON.stringify(testcase));
  }

  test();
  // if (session && session.user) {
  //   return (
  //     <div className="flex gap-4 ml-auto">
  //       <p className="text-sky-600">{session.user.name}</p>
  //       <button onClick={() => signOut()} className="text-red-600">
  //         Sign Out
  //       </button>
  //     </div>
  //   );
  // }
  // return (
  //   <button onClick={() => signIn()} className="text-green-600 ml-auto">
  //     Sign In
  //   </button>
  // );
  return (
    <nav className='flex flex-row-reverse w-full p-6 gap-2 bg-primary'>
      {session?.user ? (
      <>
        <div>{session?.user.name}</div>
        <Button variant='contained' className='bg-orange-500' onClick={() => signOut()}>
          Sign Out
        </Button>
      </>) : 
      ( 
        <>
          <Button variant='contained' className='bg-orange-500' onClick={() => signIn()}>
            Sign In
          </Button>
        </>
      )}
      
    </nav>
  )
}

export default Navbar