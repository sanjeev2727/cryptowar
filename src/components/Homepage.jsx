import React, { useState, useEffect } from 'react';
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
  const [statsData, setStatsData] = useState({
    total: 0,
    totalExchanges: 0,
    totalMarkets: 0,
    totalMarketCap: 0,
    total24hVolume: 0,
  });

  useEffect(() => {
    const globalStats = data?.data?.stats;
    setStatsData({
      total: globalStats?.total,
      totalExchanges: globalStats?.totalExchanges ? millify(globalStats?.totalExchanges) : 0,
      totalMarkets: globalStats?.totalMarkets ? millify(globalStats?.totalMarkets) : 0,
      totalMarketCap: globalStats?.totalExchanges ? millify(globalStats?.totalMarketCap) : 0,
      total24hVolume: globalStats?.totalExchanges ? millify(globalStats?.total24hVolume) : 0,
      isFetching,
    });
  }, [data]);

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={8} xm={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic valueStyle={{ color: '#1890ff' }} title="Total Cryptocurrencies" value={statsData.total} />
          </Card>
        </Col>
        <Col span={8} xm={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic title="Total Exchanges" valueStyle={{ color: '#1890ff' }} value={statsData.totalExchanges} />
          </Card>
        </Col>
        <Col span={8} xm={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic title="Total Market Cap" valueStyle={{ color: '#1890ff' }} value={`$${statsData.totalMarketCap}`} />
          </Card>
        </Col>
        <Col span={8} xm={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic title="Total 24h Volume" valueStyle={{ color: '#1890ff' }} value={`$${statsData.total24hVolume}`} />
          </Card>
        </Col>
        <Col span={8} xm={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic title="Total Markets" valueStyle={{ color: '#1890ff' }} value={statsData.totalMarkets} />
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
