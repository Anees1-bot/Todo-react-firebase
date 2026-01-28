import { Row, Col, Typography } from 'antd';
const { Title } = Typography;

const NoPage = () => {
    return (
        <div className='py-5'>
            <div className="container">
                <Row>
                    <Col sapn='24'>
                        <Title level={1} className='text-center'>404 - Page Not Found</Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default NoPage