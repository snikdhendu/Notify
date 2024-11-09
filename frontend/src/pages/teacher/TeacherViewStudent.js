import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { ChevronDown, ChevronUp, User, BookOpen, School, Calendar, Clock, Percent } from 'lucide-react';

const TeacherViewStudent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-[#46397C] text-white p-4">
                        <h2 className="text-2xl font-bold">{userDetails.name}</h2>
                        <p className="text-sm">Student Profile</p>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#FF6B2C]" />
                                <span className="font-semibold">Roll Number:</span> {userDetails.rollNum}
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-[#FF6B2C]" />
                                <span className="font-semibold">Class:</span> {sclassName.sclassName}
                            </div>
                            <div className="flex items-center">
                                <School className="w-5 h-5 mr-2 text-[#FF6B2C]" />
                                <span className="font-semibold">School:</span> {studentSchool.schoolName}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4">Attendance:</h3>
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                            <>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    if (subName === teachSubject) {
                                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                        return (
                                            <div key={index} className="mb-6">
                                                <div className="bg-gray-100 p-4 rounded-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="text-lg font-semibold">{subName}</h4>
                                                        <button
                                                            className="text-[#46397C] hover:text-[#46397C]/80 transition-colors"
                                                            onClick={() => handleOpen(subId)}
                                                        >
                                                            {openStates[subId] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <span className="font-semibold">Present:</span> {present}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Total Sessions:</span> {sessions}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Attendance:</span> {subjectAttendancePercentage}%
                                                        </div>
                                                    </div>
                                                </div>
                                                {openStates[subId] && (
                                                    <div className="mt-4 bg-white border rounded-lg overflow-hidden">
                                                        <table className="w-full">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-200">
                                                                {allData.map((data, index) => {
                                                                    const date = new Date(data.date);
                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateString}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.status}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold mb-2">Overall Attendance</h4>
                                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <Percent className="w-5 h-5 mr-2 text-[#FF6B2C]" />
                                            <span className="font-semibold">Percentage:</span> {overallAttendancePercentage.toFixed(2)}%
                                        </div>
                                        <CustomPieChart data={chartData} />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Subject Marks:</h3>
                            <button
                                className="bg-[#46397C] text-white px-4 py-2 rounded hover:bg-[#46397C]/80 transition-colors"
                                onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                            >
                                Add Marks
                            </button>
                        </div>

                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 && (
                            <div className="bg-white border rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {subjectMarks.map((result, index) => {
                                            if (result.subName.subName === teachSubject) {
                                                return (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.subName.subName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.marksObtained}</td>
                                                    </tr>
                                                )
                                            }
                                            return null;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="mt-6">
                            <button
                                className="bg-[#FF6B2C] text-white px-4 py-2 rounded hover:bg-[#FF6B2C]/80 transition-colors"
                                onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                            >
                                Add Attendance
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeacherViewStudent