import { Row, Col, Typography } from 'antd';
import { useAuth } from '@/context/Auth';
const { Title } = Typography;

const Hero = () => {
    const {user} = useAuth()
    return (
        <div className='py-5'>
            <div className="container">
                <Row>
                    <Col sapn='24'>
                        <Title level={1} className='text-center'>Hero Section</Title>
                        <Title level={2} className='text-center'>Uid: {user.uid}</Title>
                        <Title level={2} className='text-center'>Name: {user.name}</Title>
                        <Title level={2} className='text-center'>Email: {user.email}</Title>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero