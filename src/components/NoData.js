import React from 'react'
import { Typography, Row, Col, Card } from 'antd';

const { Text } = Typography;

const NoData = () => {
    return (
        <Row className="no__data">
            <Col>
                <Card><Text>No data available....</Text></Card>
            </Col>
        </Row>
    )
}

export default NoData;
