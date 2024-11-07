import React from 'react';
import { Link } from 'react-router-dom';



const Homepage = () => {
    return (
        <div className="min-h-screen bg-orange-100 max-h-screen overflow-hidden">
            {/* Header */}
            <header className="container mx-auto px-8 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rotate-45 bg-sky-400"></div>
                        <span className="text-xl font-bold">Skilline</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="text-gray-600 hover:text-gray-900" href="#">
                            Home
                        </Link>
                        <Link className="text-gray-600 hover:text-gray-900" href="#">
                            Careers
                        </Link>
                        <Link className="text-gray-600 hover:text-gray-900" href="#">
                            Blog
                        </Link>
                        <Link className="text-gray-600 hover:text-gray-900" href="#">
                            About Us
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to='/choose' className="px-6 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-full">
                            Login
                        </Link>
                        <Link to="/Adminregister" className="rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-12 py-12">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="space-y-8 p-20">
                        <h1 className="text-5xl font-bold leading-tight">
                            <span className="text-orange-500">Studying</span> Online is now{" "}
                            <span className="text-indigo-900">much easier</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Skilline is an interesting platform that will teach you in more an interactive way
                        </p>
                        <div className="flex items-center gap-6">
                            <button className="rounded-full bg-orange-500 px-8 py-3 text-white hover:bg-orange-600">
                                Join for free
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                {/* <Play className="h-8 w-8 rounded-full border-2 border-current p-1" /> */}
                                Watch how it works
                            </button>

                        </div>
                    </div>

                    {/* Right side with floating elements */}
                    <div className="relative h-[500px] rounded-lg bg-transparent p-36 -ml-20">
                        {/* Floating Elements */}
                        <div className="relative -top-48 -left-7">
                            <img src="/girl.png" />
                        </div>

                        {/* 250k Assisted Student Box */}
                        <div className="absolute left-32 top-4 rounded-lg bg-white p-4 shadow-lg animate-float">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-sky-400 p-2">
                                    <div className="h-4 w-4"></div>
                                </div>
                                <div>
                                    <div className="font-bold">250k</div>
                                    <div className="text-sm text-gray-600">Assisted Student</div>
                                </div>
                            </div>
                        </div>

                        {/* User Experience Class Box */}
                        <div className="absolute bottom-20 left-4 rounded-lg bg-white p-4 shadow-lg animate-float">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                <div>
                                    <div className="font-bold">User Experience Class</div>
                                    <div className="text-sm text-gray-600">Today at 12.00 PM</div>
                                </div>
                            </div>
                            <button className="w-full rounded-full bg-pink-500 px-4 py-2 text-white">
                                Join Now
                            </button>
                        </div>

                        {/* Congratulations Box */}
                        <div className="absolute right-10 top-44 rounded-lg bg-white p-4 shadow-lg animate-float">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-orange-400 p-2">
                                    <div className="h-4 w-4"></div>
                                </div>
                                <div>
                                    <div className="font-bold">Congratulations</div>
                                    <div className="text-sm text-gray-600">Your admission completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-white w-screen -mt-14 sm:-mt-20 lg:-mt-44 z-40 relative -ml-12">
                        <svg className="xl:h-40 xl:w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" fill="currentColor"></path>
                        </svg>
                        <div className="bg-white w-full h-64"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Homepage;

// const StyledContainer = styled(Container)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const StyledPaper = styled.div`
//   padding: 24px;
//   height: 100vh;
// `;

// const StyledBox = styled(Box)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content:center;
//   gap: 16px;
//   padding: 24px;
// `;

// const StyledTitle = styled.h1`
//   font-size: 3rem;
//   color: #252525;
//   /* font-family: "Manrope"; */
//   font-weight: bold;
//   padding-top: 0;
//   letter-spacing: normal;
//   line-height: normal;
// `;

// const StyledText = styled.p`
//   /* color: #550080; */
//   margin-top: 30px;
//   margin-bottom: 30px; 
//   letter-spacing: normal;
//   line-height: normal;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
// `;
