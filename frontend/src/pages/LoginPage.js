import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { loginUser } from '../redux/userRelated/userHandle'
import Popup from '../components/Popup'

export default function LoginPage({ role }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user)

  const [toggle, setToggle] = useState(false)
  const [guestLoader, setGuestLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [rollNumberError, setRollNumberError] = useState(false)
  const [studentNameError, setStudentNameError] = useState(false)

  // Existing handlers remain unchanged
  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (role === "Student") {
      const rollNum = event.target.rollNumber.value
      const studentName = event.target.studentName.value
      const password = event.target.password.value

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true)
        if (!studentName) setStudentNameError(true)
        if (!password) setPasswordError(true)
        return
      }
      const fields = { rollNum, studentName, password }
      setLoader(true)
      dispatch(loginUser(fields, role))
    } else {
      const email = event.target.email.value
      const password = event.target.password.value

      if (!email || !password) {
        if (!email) setEmailError(true)
        if (!password) setPasswordError(true)
        return
      }

      const fields = { email, password }
      setLoader(true)
      dispatch(loginUser(fields, role))
    }
  }

  const handleInputChange = (event) => {
    const { name } = event.target
    if (name === 'email') setEmailError(false)
    if (name === 'password') setPasswordError(false)
    if (name === 'rollNumber') setRollNumberError(false)
    if (name === 'studentName') setStudentNameError(false)
  }

  const guestModeHandler = () => {
    const password = "zxc"

    if (role === "Admin") {
      const email = "yogendra@12"
      const fields = { email, password }
      setGuestLoader(true)
      dispatch(loginUser(fields, role))
    }
    else if (role === "Student") {
      const rollNum = "1"
      const studentName = "Dipesh Awasthi"
      const fields = { rollNum, studentName, password }
      setGuestLoader(true)
      dispatch(loginUser(fields, role))
    }
    else if (role === "Teacher") {
      const email = "tony@12"
      const fields = { email, password }
      setGuestLoader(true)
      dispatch(loginUser(fields, role))
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
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
      setGuestLoader(false)
    }
  }, [status, currentRole, navigate, error, response, currentUser])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/5 p-8 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#2D3B58]">{role} Login</h2>
            <p className="mt-2 text-gray-600">Welcome back! Please enter your details</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {role === "Student" ? (
              <>
                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                    Roll Number
                  </label>
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="number"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${rollNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#F48C06] focus:border-[#F48C06]`}
                    onChange={handleInputChange}
                  />
                  {rollNumberError && <p className="mt-1 text-sm text-red-500">Roll Number is required</p>}
                </div>
                
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                    Student Name
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${studentNameError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#F48C06] focus:border-[#F48C06]`}
                    onChange={handleInputChange}
                  />
                  {studentNameError && <p className="mt-1 text-sm text-red-500">Student Name is required</p>}
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#F48C06] focus:border-[#F48C06]`}
                  onChange={handleInputChange}
                />
                {emailError && <p className="mt-1 text-sm text-red-500">Email is required</p>}
              </div>
            )}

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={toggle ? 'text' : 'password'}
                  required
                  className={`block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#F48C06] focus:border-[#F48C06]`}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {toggle ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-500">Password is required</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F48C06] focus:ring-[#F48C06] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="#" className="text-sm text-[#F48C06] hover:text-[#F48C06]/80">
                Forgot password?
              </Link>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loader}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F48C06] hover:bg-[#F48C06]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F48C06]"
              >
                {loader ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Login'
                )}
              </button>

              <button
                type="button"
                onClick={guestModeHandler}
                className="w-full flex justify-center py-2 px-4 border border-[#F48C06] rounded-md shadow-sm text-sm font-medium text-[#F48C06] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F48C06]"
              >
                Login as Guest
              </button>
            </div>

            {role === "Admin" && (
              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/Adminregister" className="text-[#F48C06] hover:text-[#F48C06]/80">
                  Sign up
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-3/5 bg-[#FFF9F5]">
        <div className="h-full w-full bg-cover bg-center"  />
      </div>

      {guestLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Please Wait</span>
          </div>
        </div>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}