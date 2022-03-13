import React from 'react'

import { Typography, Row, Col, Statistic } from 'antd';
import {Link} from 'react-router-dom'
import millify from 'millify';

import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'
import { useGetCryptosQuery } from '../services/CryptoApi';

const Homepage = () => {
  const {data, error, isFetching} = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if (isFetching) return <Loader />;

  return (
    <>
      <Typography.Title level={2}>Global Crypto Statistic</Typography.Title>
      <Row gutter={[32,32]}>
        <Col span={12}><Statistic title="Global Total" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Global TotalCoins" value={globalStats.totalCoins} /></Col>
        <Col span={12}><Statistic title="Global TotalMarkets" value={millify(globalStats.totalMarkets)} /></Col>
        <Col span={12}><Statistic title="Global TotalExchanges" value={globalStats.totalExchanges} /></Col>
        <Col span={12}><Statistic title="Global TotalMarketCap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Global Total24hVolume" value={millify(globalStats.total24hVolume)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">Top 10 Cryptos In The World</Typography.Title>
        <Typography.Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Typography.Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
        <Typography.Title level={3}><Link to="/news">Show more</Link></Typography.Title>
      </div>
      <News simplified />
    </>
  )
}


export default Homepage