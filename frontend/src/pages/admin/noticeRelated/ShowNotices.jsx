'use client'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Component() {
  const [notices, setNotices] = useState([])
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0)
  const { currentUser } = useSelector(state => state.user)
  const intervalRef = useRef(null)

  const schoolID = currentUser.role === 'Admin' ? currentUser._id : currentUser.school._id

  console.log(process.env.REACT_APP_BASE_URL);
  const fetchListOfNotices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/NoticeList/${schoolID}`)
      const result = response.data
      setNotices(Array.isArray(result) ? result : [])
    } catch (error) {
      console.error('Error fetching notices:', error)
      setNotices([])
    }
  }

  useEffect(() => {
    fetchListOfNotices()
  }, [])

  const startAutoAdvance = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length)
    }, 3000)
  }

  useEffect(() => {
    startAutoAdvance()
    return () => clearInterval(intervalRef.current)
  }, [notices])

  const handleBack = () => {
    setCurrentNoticeIndex((prevIndex) => (prevIndex - 1 + notices.length) % notices.length)
  }

  const handleForward = () => {
    setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length)
  }



  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          <span className="text-[#F48C06]">Notices</span>{" "}
          <span className="text-[#2F327D]">Board</span>
        </h1>
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl h-72 mt-6">
            {/* Nail */}
            <div className="absolute -top-10 left-1/2 w-4 h-4 bg-gray-400 rounded-full transform -translate-x-1/2 z-10 shadow-md"></div>

            {/* Rope effect */}
            <div className="absolute -top-10 left-1/2 w-40 h-24 border-t-4 border-l-4 border-r-4 border-[#8B4513] rounded-t-full transform -translate-x-1/2"></div>

            {/* Wooden frame effect */}
            <div className="absolute inset-0 bg-[#CD853F] rounded-xl transform scale-[1.02]" />

            {/* Chalkboard */}
            <div className="relative rounded-lg bg-[#2A5A4B] p-6 shadow-xl text-white transition-all flex flex-col justify-between h-full w-full text-center border-4 border-[#8B4513]">
              {/* Chalk dust effect */}
              {/* <div className="absolute inset-0 bg-white/5 rounded-lg pointer-events-none" /> */}

              {/* Content */}
              {
                notices.length > 0 ? (
                  <div className="relative space-y-4 z-10">
                    <h3 className="mb-2 text-2xl font-semibold line-clamp-2 font-['Caveat',cursive] tracking-wide">
                      {notices[currentNoticeIndex].title}
                    </h3>
                    <p className="mb-3 text-lg line-clamp-3 font-['Caveat',cursive] tracking-wide opacity-90">
                      {notices[currentNoticeIndex].details}
                    </p>
                    {/* <span className="inline-block rounded-full bg-black/30 px-4 py-1.5 text-sm text-[#F48C06] font-['Caveat',cursive]">
                    {notices[currentNoticeIndex].date}
                  </span> */}
                  </div>
                ) : (
                  <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 md:px-6 lg:px-8">
                    No Notice Till Date
                  </div>
                )
              }


              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-4 z-20 relative">
                <button onClick={handleBack} className="text-[#F48C06] hover:text-[#F4A23A] transition-colors z-20">
                  <ChevronLeft size={28} />
                </button>
                <button onClick={handleForward} className="text-[#F48C06] hover:text-[#F4A23A] transition-colors z-20">
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}