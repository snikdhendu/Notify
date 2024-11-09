import React from 'react'
import { useSelector } from 'react-redux'
import { User, Mail, School } from 'lucide-react'

export default function AdminProfile() {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="min-h-screen bg-[#FFF5EB] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
        <div className="bg-[#2F327D] text-white p-6 text-center">
          <h2 className="text-3xl font-bold mb-2">{currentUser.name}</h2>
          <p className="text-[#00C1FE]">Administrator</p>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#2F327D] mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="text-[#F48C06] mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{currentUser.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="text-[#F48C06] mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{currentUser.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <School className="text-[#F48C06] mr-3" />
                <div>
                  <p className="text-sm text-gray-500">School</p>
                  <p className="font-medium">{currentUser.schoolName}</p>
                </div>
              </div>

              
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 bg-[#F48C06] text-white rounded-full hover:bg-[#F48C06]/90 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}