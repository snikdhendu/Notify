import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailNotice = () => {
    const [notice, setNotice] = useState(null);
    const { currentUser } = useSelector(state => state.user);
    const { id } = useParams();
    const schoolID = currentUser.role === 'Admin' ? currentUser._id : currentUser.school._id;

    useEffect(() => {
        if (id) {
            const timeoutId = setTimeout(async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/NoticeList/${schoolID}`);
                    const results = response.data;
                    const result = results.find((notice) => notice._id === id);
                    setNotice(result || null);
                } catch (error) {
                    console.error('Error fetching notices:', error);
                }
            }, 2000);  // Delay by 2 seconds (or adjust based on your use case)

            // Cleanup the timeout on component unmount or when the id changes
            return () => clearTimeout(timeoutId);
        }
    }, [id]);


    return (
        <div>
            {notice ? notice.name : 'Loading...'}
        </div>
    );
};

export default DetailNotice;
