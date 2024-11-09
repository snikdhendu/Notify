'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle'
import { deleteUser } from '../../../redux/userRelated/userHandle'
import { UserMinus, UserPlus, ChevronLeft, ChevronRight, ChevronsUpDown, Eye } from 'lucide-react'

export default function ShowTeachers() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { teachersList, loading, error, response } = useSelector((state) => state.teacher)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id))
  }, [currentUser._id, dispatch])

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#F48C06]"></div>
    </div>
  } else if (response) {
    return (
      <div className="flex justify-end mt-4 px-4">
        <button
          onClick={() => navigate("/Admin/teachers/chooseclass")}
          className="px-4 py-2 bg-[#F48C06] text-white rounded-lg hover:bg-[#F48C06]/90 transition-colors"
        >
          Add Teacher
        </button>
      </div>
    )
  } else if (error) {
    console.log(error)
  }

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID)
    console.log(address)
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'teachSubject', label: 'Subject', minWidth: 100 },
    { id: 'teachSclass', label: 'Class', minWidth: 170 },
  ]

  const rows = teachersList.map((teacher) => {
    return {
      name: teacher.name,
      teachSubject: teacher.teachSubject?.subName || null,
      teachSclass: teacher.teachSclass.sclassName,
      teachSclassID: teacher.teachSclass._id,
      id: teacher._id,
    }
  })

  const actions = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      name: 'Add New Teacher',
      action: () => navigate("/Admin/teachers/chooseclass")
    },
    {
      icon: <UserMinus className="h-6 w-6" />,
      name: 'Delete All Teachers',
      action: () => deleteHandler(currentUser._id, "Teachers")
    },
  ]

  return (
    <div className="bg-[#FFF5EB] min-h-screen p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#2F327D]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <tr key={row.id} className="hover:bg-[#FFF5EB]/50">
                    {columns.map((column) => {
                      const value = row[column.id]
                      if (column.id === 'teachSubject') {
                        return (
                          <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                            {value ? (
                              value
                            ) : (
                              <button
                                className="px-4 py-2 bg-[#00C1FE] text-white rounded hover:bg-[#00C1FE]/90 transition-colors"
                                onClick={() => {
                                  navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                }}
                              >
                                Add Subject
                              </button>
                            )}
                          </td>
                        )
                      }
                      return (
                        <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                          {value}
                        </td>
                      )
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deleteHandler(row.id, "Teacher")}
                        className="text-[#F48C06] hover:text-[#F48C06]/80 mx-1"
                      >
                        <UserMinus className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                        className="px-4 py-2 text-[#00C1FE]  transition-colors mx-1"
                      >
                          <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      {/* <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(Math.min(Math.ceil(rows.length / rowsPerPage) - 1, page + 1))}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{page * rowsPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min((page + 1) * rowsPerPage, rows.length)}
              </span>{' '}
              of <span className="font-medium">{rows.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setPage(Math.min(Math.ceil(rows.length / rowsPerPage) - 1, page + 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div> */}
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