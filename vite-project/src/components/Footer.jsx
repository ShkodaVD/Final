import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Map from './ui/Map';

export default function Footer() {

  return (
    <footer className="bg-white py-20 px-6">
      <div className="max-w-[1600px] mx-auto">
        <h2 className='text-[64px] font-bold mb-10'>Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

          <div className="bg-[#F3F4F6] px-8 py-10 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-[20px] mb-2">Phone</p>
            <p className="text-[40px] font-semibold">+7 (499) 350-66-04</p>
          </div>

          <div className="bg-[#F3F4F6] px-8 py-10 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-[20px] mb-4">Socials</p>
            <div className="flex items-center gap-4 text-[40px]">
              <InstagramOutlined />
              <WhatsAppOutlined />
            </div>
          </div>

          <div className="bg-[#F3F4F6] px-8 py-10 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-[20px] mb-2">Address</p>
            <p className="text-[40px] font-semibold leading-snug">
              Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
            </p>
          </div>

          <div className="bg-[#F3F4F6] px-8 py-10 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-[20px] mb-2">Working Hours</p>
            <p className="text-[40px] font-semibold">24 hours a day</p>
          </div>

        </div>
        <Map/>
      </div>
    </footer>

  )
}
