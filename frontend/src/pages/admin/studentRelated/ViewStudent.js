'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserDetails } from '../../../redux/userRelated/userHandle'
import { User, Mail, Phone, Calendar, School, Hash } from 'lucide-react'

export default function ViewStudent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { userDetails, loading, error } = useSelector((state) => state.user)

  const studentID = params.id
  const address = "Student"

  useEffect(() => {
    dispatch(getUserDetails(studentID, address))
  }, [dispatch, studentID])

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  if (error) {
    console.log(error)
  }

  const deleteHandler = () => {
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  return (
    <div className="min-h-screen bg-[#FFF5EB] flex items-center justify-center p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F48C06]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
          <div className="bg-[#2F327D] text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">{userDetails.name}</h2>
            <p className="text-[#00C1FE] text-lg">Student</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Hash className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-medium">{userDetails.rollNum}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userDetails.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{userDetails.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{userDetails.dateOfBirth || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <School className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{userDetails.sclassName?.sclassName || 'Not assigned'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{userDetails.gender || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate(`/Admin/students/student/edit/${studentID}`)}
                className="px-6 py-2 bg-[#00C1FE] text-white rounded-full hover:bg-[#00C1FE]/90 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={deleteHandler}
                className="px-6 py-2 bg-[#F48C06] text-white rounded-full hover:bg-[#F48C06]/90 transition-colors"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-gray-800">{message}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-[#F48C06] text-white rounded-md hover:bg-[#F48C06]/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}