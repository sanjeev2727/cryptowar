import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading" hoverable>
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={8}>
          <Card hoverable>
            <Statistic valueStyle={{ color: '#1890ff' }} title="Total Cryptocurrencies" value={globalStats?.total} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic title="Total Exchanges" valueStyle={{ color: '#1890ff' }} value={millify(globalStats?.totalExchanges)} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic title="Total Market Cap" valueStyle={{ color: '#1890ff' }} value={`$${millify(globalStats?.totalMarketCap)}`} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic title="Total 24h Volume" valueStyle={{ color: '#1890ff' }} value={`$${millify(globalStats?.total24hVolume)}`} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic title="Total Cryptocurrencies" value={globalStats.total} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic title="Total Markets" valueStyle={{ color: '#1890ff' }} value={millify(globalStats?.totalMarkets)} />
          </Card>
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrency
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Cryptocurrency News
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
