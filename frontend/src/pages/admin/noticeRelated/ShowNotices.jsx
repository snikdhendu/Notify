'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Component() {
  const [notices, setNotices] = useState([])
  const { currentUser } = useSelector(state => state.user);
  let schoolID = '';
  console.log(currentUser.role);
  if(currentUser.role == 'Admin') {
    schoolID=currentUser._id;
  }else {
    schoolID=currentUser.school._id;
    
  }

  const fetchListOfNotices = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/NoticeList/${schoolID}`);
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
      const result = response.data
      // if (result) {
        setNotices(Array.isArray(result) ? result : []);
      // }
    } catch (error) {
      console.error('Error fetching notices:', error)
      setNotices([]);
    }
  }

  useEffect(() => {
    fetchListOfNotices()
  }, [])
  if(notices.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 md:px-6 lg:px-8">
        No Notice Till date
     </div>
    )

  }

  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          <span className="text-[#F48C06]">Latest</span>{" "}
          <span className="text-[#2F327D]">Notices</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="mb-2 text-lg font-semibold text-[#2F327D] line-clamp-2">
                  {notice.title}
                </h3>
                <p className="mb-3 text-sm text-gray-600 line-clamp-3">{notice.details}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FFF8F3] px-3 py-1 text-xs text-[#F48C06]">
                  {notice.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}