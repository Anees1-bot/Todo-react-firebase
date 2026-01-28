import { Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const Hero = () => {
    return (
        <div className='py-5'>
            <div className="container">
                <Row>
                    <Col sapn={24} className='text-center'>
                        <Title className='text-center'>Hero Section</Title>
                        <Space>
                            <Link to="/" className='btn btn-primary'>Frontend</Link>
                            <Link to="/dashboard/todos" className='btn btn-primary'>Todos</Link>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero