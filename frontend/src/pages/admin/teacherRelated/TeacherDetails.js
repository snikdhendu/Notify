'use client'

import React, { useEffect } from 'react'
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { User, Mail, Phone, BookOpen, School, Users } from 'lucide-react'

export default function TeacherDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const { loading, teacherDetails, error } = useSelector((state) => state.teacher)

  const teacherID = params.id

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID))
  }, [dispatch, teacherID])

  if (error) {
    console.log(error)
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName

  const handleAddSubject = () => {
    navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`)
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
            <h2 className="text-3xl font-bold mb-2">{teacherDetails?.name}</h2>
            <p className="text-[#00C1FE] text-lg">Teacher</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{teacherDetails?.email || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{teacherDetails?.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <School className="text-[#F48C06] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{teacherDetails?.teachSclass?.sclassName || 'Not assigned'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {isSubjectNamePresent ? (
                  <>
                    <div className="flex items-center">
                      <BookOpen className="text-[#F48C06] mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-medium">{teacherDetails?.teachSubject?.subName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="text-[#F48C06] mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Sessions</p>
                        <p className="font-medium">{teacherDetails?.teachSubject?.sessions}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <button
                      onClick={handleAddSubject}
                      className="px-6 py-2 bg-[#F48C06] text-white rounded-full hover:bg-[#F48C06]/90 transition-colors"
                    >
                      Add Subject
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate(`/Admin/teachers/teacher/edit/${teacherID}`)}
                className="px-6 py-2 bg-[#00C1FE] text-white rounded-full hover:bg-[#00C1FE]/90 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate(`/Admin/teachers`)}
                className="px-6 py-2 bg-[#2F327D] text-white rounded-full hover:bg-[#2F327D]/90 transition-colors"
              >
                Back to Teachers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}