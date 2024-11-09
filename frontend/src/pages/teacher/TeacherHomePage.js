
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ShowNotices from '../admin/noticeRelated/ShowNotices';
import { Users, GraduationCap, UserCog, DollarSign } from "lucide-react"

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions
    const statsCards = [
        {
          title: "Total Students",
          value: numberOfStudents,
          icon: Users,
          gradient: "from-blue-600 to-blue-400",
        },
        {
          title: "Total Lessons",
          value: numberOfSessions,
          icon: GraduationCap,
          gradient: "from-purple-600 to-purple-400",
        },
        {
          title: "Tests Taken",
          value: 50,
          icon: UserCog,
          gradient: "from-pink-600 to-pink-400",
        },
        {
          title: "Total Hours",
          value: 12,
        //   prefix: "$",
          icon: DollarSign,
          gradient: "from-green-600 to-green-400",
        },
      ]

    return (
        <>
            {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Students} alt="Students" />
                            <Title>
                                Class Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Lessons} alt="Lessons" />
                            <Title>
                                Total Lessons
                            </Title>
                            <Data start={0} end={numberOfSessions} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Tests} alt="Tests" />
                            <Title>
                                Tests Taken
                            </Title>
                            <Data start={0} end={24} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Time} alt="Time" />
                            <Title>
                                Total Hours
                            </Title>
                            <Data start={0} end={30} duration={4} suffix="hrs"/>                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            < ShowNotices />
                        </Paper>
                    </Grid>
                </Grid>
            </Container> */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => (
                        <div
                            key={card.title}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
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

                <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <div className="p-6">
                        <ShowNotices />
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeacherHomePage;

