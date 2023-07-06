"use client"

import React from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@mui/material'
import AddVehicleButton from './AddVehicleButton';

const Navbar = () => {
  const session = useSession();
  console.log(session);
  // const res = fetch("http://localhost:3000/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //       username: "John", 
  //       password: "111"
  //   }),
  // })
  // .then(res => console.log(res.json()))
  // console.log(JSON.stringify(session?.user));

  async function test(){
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username: "John", 
          password: "111"
      }),
    })
    const user = await res.json();
    console.log(user);
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
    <nav className='flex-between w-full p-6 gap-2 bg-primary'>
      {session.data?.user ? (
      <>
        <div>{session?.data.user.name}</div>
        <Button variant='contained' className='bg-orange-500' onClick={() => signOut()}>
          Sign Out
        </Button>
      </>) : 
      ( 
        <>
          <Image 
            src="/logo.svg"
            alt="logo"
            width={150}
            height={0}
            className='object-contain'
          />  
          
          <AddVehicleButton />
          {/* <Button variant='contained' className='bg-orange-500' onClick={() => signIn()}>
            Sign In
          </Button> */}
        </>
      )}
      
    </nav>
  )
}

export default Navbar