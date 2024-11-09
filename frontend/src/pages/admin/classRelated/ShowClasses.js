'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../../redux/userRelated/userHandle'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle'
import { Trash2, Eye, Plus, UserPlus, BookOpen, MoreVertical } from 'lucide-react'

export default function ShowClasses() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass)
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"))
  }, [adminID, dispatch])

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID)
    console.log(address)
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ]

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    }
  })

  const SclassButtonHaver = ({ row }) => {
    const [showMenu, setShowMenu] = useState(false)
    const actions = [
      { icon: <BookOpen className="h-4 w-4" />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <UserPlus className="h-4 w-4" />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ]

    return (
      <div className="flex items-center space-x-2">
        <button onClick={() => deleteHandler(row.id, "Sclass")} className="text-red-600 hover:text-red-800">
          <Trash2 className="h-5 w-5" />
        </button>
        {/* <button
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
          className="px-3 py-1 text-[#00C1FE] text-lg rounded"
        >
            <Eye className="h-5 w-5" />
        </button> */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-gray-600 hover:text-gray-800">
            {/* <MoreVertical className="h-5 w-5" /> */}
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.action()
                    setShowMenu(false)
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {action.icon}
                  <span className="ml-2">{action.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const actions = [
    {
      icon: <Plus className="h-6 w-6" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <Trash2 className="h-6 w-6" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFF5EB] p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F48C06]"></div>
        </div>
      ) : (
        <>
          {getresponse ? (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate("/Admin/addclass")}
                className="px-4 py-2 bg-[#F48C06] text-white rounded-lg hover:bg-[#F48C06]/90 transition-colors"
              >
                Add Class
              </button>
            </div>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#2F327D]">
                      <tr>
                        {sclassColumns.map((column) => (
                          <th
                            key={column.id}
                            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            {column.label}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sclassRows.map((row) => (
                        <tr key={row.id} className="hover:bg-[#FFF5EB]/50">
                          <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <SclassButtonHaver row={row} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="fixed right-6 bottom-6">
                <div className="flex flex-col gap-2">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="p-3 bg-[#F48C06] text-white rounded-full hover:bg-[#F48C06]/90 shadow-lg"
                    >
                      {action.icon}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
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