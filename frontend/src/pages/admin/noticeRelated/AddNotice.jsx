'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, Plus, X } from 'lucide-react'

function NoticeForm({ isModal, title, desc, setTitle, setDesc, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className={`${isModal ? '' : 'max-w-xl mx-auto mt-20'}`}>
      <div className="flex flex-col gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-[#2F327D]">
            Title
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F48C06] focus:border-transparent"
            placeholder="Notice Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-[#2F327D]">
            Description
          </label>
          <textarea
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F48C06] focus:border-transparent"
            placeholder="Notice Description"
            rows={4}
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 text-white font-medium rounded-xl bg-[#F48C06] hover:bg-[#e07a05] transition-colors"
        >
          Add Notice
        </button>
      </div>
    </form>
  )
}

export default function Component() {
  const [notices, setNotices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchListOfNotices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/NoticeList')
      const result = response.data
      if (result) {
        setNotices(result)
      }
    } catch (error) {
      console.error('Error fetching notices:', error)
    }
  }

  useEffect(() => {
    fetchListOfNotices()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/NoticeCreate', {
        title: title,
        details: desc
      })
      if (response.data) {
        setTitle('')
        setDesc('')
        setIsModalOpen(false)
        fetchListOfNotices()
      }
    } catch (error) {
      console.error('Error creating notice:', error)
    }
  }

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.details.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (notices.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F3] p-8">
        <h1 className="text-center text-4xl font-bold mb-12">
          <span className="text-[#F48C06]">Create</span>{" "}
          <span className="text-[#2F327D]">First Notice</span>
        </h1>
        <NoticeForm
          title={title}
          desc={desc}
          setTitle={setTitle}
          setDesc={setDesc}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-[#F48C06]">Latest</span>{" "}
            <span className="text-[#2F327D]">Notices</span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 text-white font-medium rounded-xl bg-[#F48C06] hover:bg-[#e07a05] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Notice
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F48C06] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Notices Grid */}
        <div className="grid gap-6">
          {filteredNotices.map((notice, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <h3 className="mb-3 text-xl font-semibold text-[#2F327D]">
                {notice.title}
              </h3>
              <p className="mb-4 text-gray-600">{notice.details}</p>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FFF8F3] px-4 py-1 text-sm text-[#F48C06]">
                  {notice.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#2F327D]">Add New Notice</h2>
            <NoticeForm
              isModal={true}
              title={title}
              desc={desc}
              setTitle={setTitle}
              setDesc={setDesc}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  )
}
