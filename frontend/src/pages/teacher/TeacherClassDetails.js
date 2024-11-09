import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

const TeacherClassDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        const options = [];
        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
        }
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
        };

        const handleMenuItemClick = (index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <div className="flex space-x-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                >
                    <Eye className="w-5 h-5" />
                </button>
                {/* <div className="relative">
                    <div className="flex">
                        <button
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l hover:bg-gray-300 transition-colors"
                            onClick={handleClick}
                        >
                            {options[selectedIndex]}
                        </button>
                        <button
                            className="bg-gray-300 text-gray-800 px-2 py-2 rounded-r hover:bg-gray-400 transition-colors"
                            onClick={handleToggle}
                            ref={anchorRef}
                        >
                            {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    </div>
                    {open && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {options.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`${
                                            index === selectedIndex ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900`}
                                        onClick={() => handleMenuItemClick(index)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div> */}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center mb-8">Class Details</h1>
                    {getresponse ? (
                        <div className="text-right mt-4">No Students Found</div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <h2 className="text-xl font-semibold p-4 bg-gray-50">Students List:</h2>
                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-[#2F327D] text-white">
                                                {studentColumns.map((column) => (
                                                    <th key={column.id} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                        {column.label}
                                                    </th>
                                                ))}
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {studentRows.map((row) => (
                                                <tr key={row.id}>
                                                    {studentColumns.map((column) => (
                                                        <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                                                            {row[column.id]}
                                                        </td>
                                                    ))}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <StudentsButtonHaver row={row} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TeacherClassDetails;