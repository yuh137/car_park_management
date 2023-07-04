import React from 'react'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'
import '@styles/global.css'

const RootLayout = ( { children, } 
    : {
        children: React.ReactNode
    } ) => {
  return (
    <html lang='en'>
      <body>
        <div className="main">
            <div className="gradient" />
        </div>

        <main className="app">
            <Navbar />
            {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout