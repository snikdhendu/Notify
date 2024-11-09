'use client'

import React from 'react'
import { LogOut, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authLogout } from '../redux/userRelated/userSlice';

export default function LogoutModal() {
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
};

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="fixed inset-0 bg-orange-100/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-lg bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-lg border border-orange-200">
        <div className="flex flex-col space-y-4 text-center">
          <h2 className="text-2xl font-bold text-orange-800">
            {currentUser?.name}
          </h2>
          <p className="text-lg text-orange-700">
            Are you sure you want to log out?
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-orange-200 text-orange-800 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            <X className="mr-2 h-5 w-5" />
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}