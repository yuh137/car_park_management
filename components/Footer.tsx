'use client'

import React from 'react'
import { Icon } from '@iconify/react'

const Footer = () => {
  return (
    <div className='flex flex-col bg-primary w-full px-20 py-8'>
      <div className='flex justify-between items-center text-lg font-semibold text-slate-200 pb-4'>
        <div>ParkEasy Ltd. Co</div>
        <div className='footer-social flex gap-1'>
          <Icon icon="mdi:facebook"/>
          <Icon icon="mdi:youtube"/>
          <Icon icon="mdi:twitter"/>
          <Icon icon="mdi:reddit"/>
        </div>
      </div>
      <div className='w-full h-[1px] bg-slate-200'/>
      <div className='flex justify-between text-xs pt-2'>
        <div>Website owner: Mr Huy</div>
        <div>Tele: +84 123456789</div>
      </div>
    </div>
  )
}

export default Footer