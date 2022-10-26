import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';


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
                    <Col md={{ span: 4 }} className="px-4">
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
                    <Col md={{ span: 4 }} className="px-4">
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
                    <Col md={{ span: 4 }} className="px-4">
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
                </Row>
            </Col>
        </Row>
    )
}

export default UserStatistics;