/* Import Dependencies */
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';
import { Row, Col } from 'react-bootstrap';


const UserStatistics = () => {
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];

    return (
        <Row>
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <Row>
                            <Col md={{ span: 3 }} className="profile_statistic border-b-2-primary-dark text-center">
                                <p className="m-0"> Total of: </p>

                                <span className="profile_statisticNumber fw-bold">
                                    <CountUp end={100} />
                                </span>

                                <p className="mb-2"> annotations </p>
                            </Col>

                            <Col md={{ span: 3, offset: 1 }} className="profile_statistic border-b-2-primary-dark text-center">
                                <p className="m-0"> Annotated: </p>

                                <span className="profile_statisticNumber fw-bold">
                                    <CountUp end={60} />
                                </span>

                                <p className="mb-2"> specimens </p>
                            </Col>

                            <Col md={{ span: 3, offset: 1 }} className="profile_statistic border-b-2-primary-dark text-center">
                                <p className="m-0"> Annotated: </p>

                                <span className="profile_statisticNumber fw-bold">
                                    <CountUp end={60} />
                                </span>

                                <p className="mb-2"> specimens </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-5">
                    {[1, 2].map((_number, i) => {
                        return (
                            <Col md={{ span: 4 }} className="px-4" key={i}>
                                <Row>
                                    <Col className="profile_userStatistic d-flex justify-content-center">
                                        <ResponsiveContainer width="100%" height="100%" className="py-2">
                                            <PieChart width={400} height={400}>
                                                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default UserStatistics;