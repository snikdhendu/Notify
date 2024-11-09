'use client'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../redux/userRelated/userHandle'
import { underControl } from '../../../redux/userRelated/userSlice'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle'
import { Loader2 } from 'lucide-react'

export default function AddStudent({ situation }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userState = useSelector(state => state.user)
  const { status, currentUser, response, error } = userState
  const { sclassesList } = useSelector((state) => state.sclass)

  const [name, setName] = useState('')
  const [rollNum, setRollNum] = useState('')
  const [password, setPassword] = useState('')
  const [className, setClassName] = useState('')
  const [sclassName, setSclassName] = useState('')

  const adminID = currentUser._id
  const role = "Student"
  const attendance = []

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id)
    }
  }, [params.id, situation])

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"))
  }, [adminID, dispatch])

  const changeHandler = (event) => {
    if (event.target.value === 'Select Class') {
      setClassName('Select Class')
      setSclassName('')
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      )
      setClassName(selectedClass.sclassName)
      setSclassName(selectedClass._id)
    }
  }

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

  const submitHandler = (event) => {
    event.preventDefault()
    if (sclassName === "") {
      setMessage("Please select a classname")
      setShowPopup(true)
    }
    else {
      setLoader(true)
      dispatch(registerUser(fields, role))
    }
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate(-1)
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch])

  return (
    <div className="min-h-screen bg-[#FFF5EB] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-[#2F327D] mb-6">Add Student</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00C1FE] focus:ring focus:ring-[#00C1FE] focus:ring-opacity-50"
              placeholder="Enter student's name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {situation === "Student" && (
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
              <select
                id="class"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00C1FE] focus:ring focus:ring-[#00C1FE] focus:ring-opacity-50"
                value={className}
                onChange={changeHandler}
                required
              >
                <option value='Select Class'>Select Class</option>
                {sclassesList.map((classItem, index) => (
                  <option key={index} value={classItem.sclassName}>
                    {classItem.sclassName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="rollNum" className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="number"
              id="rollNum"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00C1FE] focus:ring focus:ring-[#00C1FE] focus:ring-opacity-50"
              placeholder="Enter student's Roll Number..."
              value={rollNum}
              onChange={(e) => setRollNum(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00C1FE] focus:ring focus:ring-[#00C1FE] focus:ring-opacity-50"
              placeholder="Enter student's password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F48C06] hover:bg-[#F48C06]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F48C06]"
            disabled={loader}
          >
            {loader ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Add Student'
            )}
          </button>
        </form>
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