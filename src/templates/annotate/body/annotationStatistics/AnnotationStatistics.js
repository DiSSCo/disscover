import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';


const AnnotationStatistics = () => {
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];

    return (
        <Row>
            <Col md={{ span: 6 }} className="annotate_statisticsSection">
                <ResponsiveContainer width="100%" height="100%" className="py-2">
                    <PieChart width={400} height={400}>
                        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Col>
            <Col md={{ span: 6 }} className="annotate_statisticsSection">
                <ResponsiveContainer width="100%" height="100%" className="py-2">
                    <PieChart width={400} height={400}>
                        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Col>
        </Row>
    );
}

export default AnnotationStatistics;