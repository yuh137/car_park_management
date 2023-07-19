import React from 'react'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Provider from '@components/Provider'
import MUIThemeProvider from '@components/ThemeProvider'
import '@styles/global.css'

const RootLayout = ( { children, } 
    : {
        children: React.ReactNode
    } ) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <MUIThemeProvider>
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="app">
                <Navbar />
                {children}
                <Footer />
            </main>
          </MUIThemeProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout