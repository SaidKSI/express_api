import React from 'react'
import Menu from './Menu'

export default function Layout({children}) {
  return (
    <div className='container mx-auto'>
        <Menu/>
        <div className='py-[50px]'>
        {
            children
        }

        </div>
       
        <footer className='mt-32'>
            copyright {new Date().getFullYear()}
        </footer>
    </div>
  )
}
