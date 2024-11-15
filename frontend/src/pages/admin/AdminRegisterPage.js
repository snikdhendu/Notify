import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/userRelated/userHandle'
import { EyeIcon, EyeOffIcon } from 'lucide-react'


export default function AdminRegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user)

  const [showPassword, setShowPassword] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const [formErrors, setFormErrors] = useState({})

  const role = "Admin"

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const fields = Object.fromEntries(formData.entries())

    const errors = {}
    Object.keys(fields).forEach(key => {
      if (!fields[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
      }
    })

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setLoader(true)
    dispatch(registerUser({ ...fields, role }, role))
  }

  const handleInputChange = (event) => {
    const { name } = event.target
    setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard')
    } else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    } else if (status === 'error') {
      console.log(error)
    }
  }, [status, currentUser, currentRole, navigate, error, response])

  return (
    <div className="min-h-screen flex bg-[#FFF8F3]">

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-[#252641]">Admin Register</h2>
            <p className="mt-2 text-sm text-[#696984]">
              Create your own school by registering as an admin.
              <br />
              You will be able to add students and faculty and manage the system.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="adminName" className="block text-sm font-medium text-[#252641]">Your Name</label>
                <input
                  id="adminName"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-[#696984] rounded-md text-sm shadow-sm placeholder-[#696984]
                            focus:outline-none focus:border-[#FF7426] focus:ring-1 focus:ring-[#FF7426]"
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="schoolName" className="block text-sm font-medium text-[#252641]">School Name</label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  autoComplete="off"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-[#696984] rounded-md text-sm shadow-sm placeholder-[#696984]
                            focus:outline-none focus:border-[#FF7426] focus:ring-1 focus:ring-[#FF7426]"
                  onChange={handleInputChange}
                />
                {formErrors.schoolName && <p className="mt-2 text-sm text-red-600">{formErrors.schoolName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#252641]">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-[#696984] rounded-md text-sm shadow-sm placeholder-[#696984]
                            focus:outline-none focus:border-[#FF7426] focus:ring-1 focus:ring-[#FF7426]"
                  onChange={handleInputChange}
                />
                {formErrors.email && <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#252641]">Password</label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="block w-full px-3 py-2 bg-white border border-[#696984] rounded-md text-sm shadow-sm placeholder-[#696984]
                              focus:outline-none focus:border-[#FF7426] focus:ring-1 focus:ring-[#FF7426]"
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
                {formErrors.password && <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#FF7426] focus:ring-[#FF7426] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#696984]">Remember me</label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF7426] hover:bg-[#ff8541] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7426]"
                  disabled={loader}
                >
                  {loader ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Register"}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-[#696984]">
              Already have an account?{' '}
              <Link to="/Adminlogin" className="font-medium text-[#FF7426] hover:text-[#ff8541]">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 min-h-screen">
        {/* <img src=''/> */}
                  
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{message}</h3>
              <div className="mt-2 px-7 py-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-[#FF7426] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#ff8541] focus:outline-none focus:ring-2 focus:ring-[#FF7426]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}