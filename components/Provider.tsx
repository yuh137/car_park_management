'use client';

import React from 'react';
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';

const Provider = ({ children } 
  : { 
    children: React.ReactNode, 
    // session: Session 
  }) => (
  <SessionProvider>
    {children}
  </SessionProvider>
)

export default Provider;