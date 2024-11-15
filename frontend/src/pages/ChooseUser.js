import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/userRelated/userHandle'
import { GraduationCap, Users2, UserCog } from "lucide-react"
// import { useEffect } from 'react'
export default function ChooseUser({ visitor }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"
  const [backgroundEmojis, setBackgroundEmojis] = useState([])


  useEffect(() => {
    const emojis =
    ['📚', '📝', '🎓', '🧑‍🏫', '💡', '📖', '✏️', '🧠', '📅', '📊', '🖊️', '🖋️', '🔍', '📎', '📐', '📏', '✂️', '🗂️', '🧮']
    const newBackgroundEmojis = []
    for (let i = 0; i < 7000; i++) {
      newBackgroundEmojis.push(emojis[Math.floor(Math.random() * emojis.length)])
    }
    setBackgroundEmojis(newBackgroundEmojis)
  }, [])


  const { status, currentUser, currentRole } = useSelector(state => state.user)
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin')
      }
    }
    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin')
      }
    }
    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin')
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard')
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard')
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard')
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F3] to-[#FFE9D5] p-8 max-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center pointer-events-none h-screen overflow-hidden">
        {backgroundEmojis.map((emoji, index) => (
          <span key={index} className="text-2xl p-2">{emoji}</span>
        ))}
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#252641]">
          Choose Your Role
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <div
            onClick={() => navigateHandler("Admin")}
            className="group cursor-pointer"
          >
            <div className="bg-white scale-95 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#FFF1E7] rounded-full">
                  <UserCog className="w-8 h-8 text-[#FF7426]" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-center text-[#252641] mb-4">Admin</h2>
              <p className="text-center text-[#696984]">
                Login as an administrator to access the dashboard to manage app data.
              </p>
            </div>
          </div>

          {/* Student Card */}
          <div
            onClick={() => navigateHandler("Student")}
            className="group cursor-pointer"
          >
            <div className="bg-white scale-95 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#FFF1E7] rounded-full">
                  <GraduationCap className="w-8 h-8 text-[#FF7426]" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-center text-[#252641] mb-4">Student</h2>
              <p className="text-center text-[#696984]">
                Login as a student to explore course materials and assignments.
              </p>
            </div>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => navigateHandler("Teacher")}
            className="group cursor-pointer"
          >
            <div className="bg-white scale-95 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#FFF1E7] rounded-full">
                  <Users2 className="w-8 h-8 text-[#FF7426]" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-center text-[#252641] mb-4">Teacher</h2>
              <p className="text-center text-[#696984]">
                Login as a teacher to track student progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            Please Wait
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-red-600">{message}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#ff8541]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}