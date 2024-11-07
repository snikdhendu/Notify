'use client'

import { Users, GraduationCap, UserCog, DollarSign } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllStudents } from '../../redux/studentRelated/studentHandle'
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle'
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle'
import ShowNotices from './noticeRelated/ShowNotices'

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const { studentsList } = useSelector((state) => state.student)
  const { sclassesList } = useSelector((state) => state.sclass)
  const { teachersList } = useSelector((state) => state.teacher)
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllStudents(adminID))
    dispatch(getAllSclasses(adminID, "Sclass"))
    dispatch(getAllTeachers(adminID))
  }, [adminID, dispatch])

  const numberOfStudents = studentsList?.length || 0
  const numberOfClasses = sclassesList?.length || 0
  const numberOfTeachers = teachersList?.length || 0

  const statsCards = [
    {
      title: "Total Students",
      value: numberOfStudents,
      icon: Users,
      gradient: "from-blue-600 to-blue-400",
    },
    {
      title: "Total Classes",
      value: numberOfClasses,
      icon: GraduationCap,
      gradient: "from-purple-600 to-purple-400",
    },
    {
      title: "Total Teachers",
      value: numberOfTeachers,
      icon: UserCog,
      gradient: "from-pink-600 to-pink-400",
    },
    {
      title: "Fees Collection",
      value: 23000,
      prefix: "$",
      icon: DollarSign,
      gradient: "from-green-600 to-green-400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={card.title}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 animate-fade-in-up`}
            style={{animationDelay: `${index * 100}ms`}}
          >
            <div className={`p-6 bg-gradient-to-br ${card.gradient}`}>
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white bg-opacity-30 rounded-full animate-float">
                  <card.icon className="w-6 h-6 text-white " />
                </div>
                <div className="text-2xl font-bold text-white animate-count-up" style={{
                  counterReset: `count ${card.value}`,
                  animation: 'count-up 2s linear forwards'
                }}>
                  {card.prefix}{card.value}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up" style={{animationDelay: '400ms'}}>
        <div className="p-6">
          <ShowNotices />
        </div>
      </div>
    </div>
  )
}