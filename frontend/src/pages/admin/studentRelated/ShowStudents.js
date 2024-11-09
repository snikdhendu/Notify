'use client'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getAllStudents } from '../../../redux/studentRelated/studentHandle'
import { deleteUser } from '../../../redux/userRelated/userHandle'
import { UserMinus, UserPlus, ChevronUp, ChevronDown, Eye } from 'lucide-react'

export default function ShowStudents() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { studentsList, loading, error, response } = useSelector((state) => state.student)
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id))
  }, [currentUser._id, dispatch])

  const [showPopup, setShowPopup] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const options = ['Take Attendance', 'Provide Marks']

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  const handleClick = (row) => {
    if (selectedIndex === 0) {
      navigate("/Admin/students/student/attendance/" + row.id)
    } else if (selectedIndex === 1) {
      navigate("/Admin/students/student/marks/" + row.id)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF5EB] p-6">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {response ? (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate("/Admin/addstudents")}
                className="px-4 py-2 bg-[#F48C06] text-white rounded-lg hover:bg-[#F48C06]/90 transition-colors"
              >
                Add Students
              </button>
            </div>
          ) : (
            <div className="bg-white/80 rounded-lg shadow-md backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2F327D] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Roll Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsList && studentsList.map((student) => (
                      <tr key={student._id} className="hover:bg-[#FFF5EB]/50 rounded-lg">
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.rollNum}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.sclassName.sclassName}</td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button
                            onClick={() => deleteHandler(student._id, "Student")}
                            className="p-1 text-[#F48C06] hover:text-[#F48C06]/80"
                          >
                            <UserMinus className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate("/Admin/students/student/" + student._id)}
                            className="p-1 text-[#00C1FE] hover:text-[#00C1FE]/80"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {/* <div className="relative inline-block">
                            <button
                              onClick={() => handleClick(student)}
                              className="inline-flex items-center px-4 py-2 bg-[#F48C06] text-white rounded-md hover:bg-[#F48C06]/90"
                            >
                              {options[selectedIndex]}
                              {open ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                            </button>
                          </div> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="fixed right-6 bottom-6">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/Admin/addstudents")}
                className="p-3 bg-[#00C1FE] text-white rounded-full hover:bg-[#00C1FE]/90 shadow-lg"
              >
                <UserPlus className="h-6 w-6" />
              </button>
              <button
                onClick={() => deleteHandler(currentUser._id, "Students")}
                className="p-3 bg-[#F48C06] text-white rounded-full hover:bg-[#F48C06]/90 shadow-lg"
              >
                <UserMinus className="h-6 w-6" />
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