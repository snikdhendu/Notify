// import React from 'react'
// import styled from 'styled-components';
// import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
// import { useSelector } from 'react-redux';

// const StudentProfile = () => {
//   const { currentUser, response, error } = useSelector((state) => state.user);

//   if (response) { console.log(response) }
//   else if (error) { console.log(error) }

//   const sclassName = currentUser.sclassName
//   const studentSchool = currentUser.school

//   return (
//     <>
//       <Container maxWidth="md">
//         <StyledPaper elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
//                   {String(currentUser.name).charAt(0)}
//                 </Avatar>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Typography variant="h5" component="h2" textAlign="center">
//                   {currentUser.name}
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Typography variant="subtitle1" component="p" textAlign="center">
//                   Student Roll No: {currentUser.rollNum}
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Typography variant="subtitle1" component="p" textAlign="center">
//                   Class: {sclassName.sclassName}
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Typography variant="subtitle1" component="p" textAlign="center">
//                   School: {studentSchool.schoolName}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </StyledPaper>
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Personal Information
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="p">
//                   <strong>Date of Birth:</strong> January 1, 2000
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="p">
//                   <strong>Gender:</strong> Male
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="p">
//                   <strong>Email:</strong> john.doe@example.com
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="p">
//                   <strong>Phone:</strong> (123) 456-7890
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="p">
//                   <strong>Address:</strong> 123 Main Street, City, Country
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="subtitle1" component="p">
//                   <strong>Emergency Contact:</strong> (987) 654-3210
//                 </Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Container>
//     </>
//   )
// }

// export default StudentProfile

// const StyledPaper = styled(Paper)`
//   padding: 20px;
//   margin-bottom: 20px;
// `;

import React from 'react'
import { useSelector } from 'react-redux'
import { User, Mail, Building2, BookOpen, GraduationCap, Cake, Phone, MapPin, UserPlus } from 'lucide-react'

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user)

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl w-4/6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#46397C] p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-[#46397C] text-4xl font-bold">
            {String(currentUser.name).charAt(0)}
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">{currentUser.name}</h1>
          <p className="text-[#4CC9F0]">Student</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-[#46397C] text-2xl font-semibold mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* Student Roll No */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B2C]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#FF6B2C]" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Student Roll No</p>
                <p className="text-gray-900">{currentUser.rollNum}</p>
              </div>
            </div>

            {/* Class */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B2C]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#FF6B2C]" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Class</p>
                <p className="text-gray-900">{sclassName.sclassName}</p>
              </div>
            </div>

            {/* School */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B2C]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#FF6B2C]" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">School</p>
                <p className="text-gray-900">{studentSchool.schoolName}</p>
              </div>
            </div>

            {/* Date of Birth */}

            {/* Edit Profile Button */}
            <button className="w-full bg-[#FF6B2C] text-white py-3 rounded-lg mt-4 hover:bg-[#FF6B2C]/90 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile