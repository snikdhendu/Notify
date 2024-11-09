import React from 'react'
import { useSelector } from 'react-redux'

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user)

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50 ">
      <div className=" w-[700px]  rounded-lg overflow-hidden shadow-xl bg-white ">
        {/* Header Section */}
        <div className="bg-indigo-900 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{currentUser.name}</h2>
          <p className="text-cyan-400">Teacher</p>
        </div>

        {/* Profile Information Section */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-indigo-900 mb-6">Profile Information</h3>
          
          <div className="space-y-6">
            {/* Full Name */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="text-gray-800 font-medium">{currentUser.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-800 font-medium">{currentUser.email}</p>
              </div>
            </div>

            {/* School */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">School</p>
                <p className="text-gray-800 font-medium">{teachSchool.schoolName}</p>
              </div>
            </div>

            {/* Class */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Class</p>
                <p className="text-gray-800 font-medium">{teachSclass.sclassName}</p>
              </div>
            </div>

            {/* Subject */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Subject</p>
                <p className="text-gray-800 font-medium">{teachSubject.subName}</p>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeacherProfile