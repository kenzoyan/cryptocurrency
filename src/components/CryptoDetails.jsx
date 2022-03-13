import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptosDetailsQuery, useGetCryptosHistoryQuery } from '../services/CryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';

const CryptoDetails = () => {

  const {coinId} =useParams()

  const [timePeriod, setTimeperiod] = useState('7d');

  const { data: crypto, isFetching} = useGetCryptosDetailsQuery(coinId)
  const { data: coinHistory, error} = useGetCryptosHistoryQuery({ coinId, timePeriod })
  const cryptoDetails = crypto?.data?.coin;
  console.log('coinHistory', coinHistory)

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className='coin-heading-container'>
        <Typography.Title level={2} className='coin-name'>{cryptoDetails?.name}({cryptoDetails?.symbol})</Typography.Title>
        <Typography.Title level={4} className='coin-name'> Statistics</Typography.Title>
      </Col>

      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date,i) => <Select.Option key={date}>{date}</Select.Option>)}
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
      
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Typography.Title>
          </Col>
          {stats.map(({title,icon,value})=>(
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Typography.Text>{icon}</Typography.Text>
              <Typography.Text>{title}</Typography.Text> 
            </Col>
            <Typography.Text>{value}</Typography.Text>
          </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
          <Typography.Title level={2} className='coin-details-heading'>Other Statistics Info</Typography.Title>
          </Col>
          { genericStats.map(({title,icon,value})=>(
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text> 
              </Col>
              <Typography.Text>{value}</Typography.Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Typography.Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Typography.Title>
          {cryptoDetails.links?.map((link,i) => (
            <Row className="coin-link" key={i}>
              <Typography.Title level={5} className="link-name">{link.type}</Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>


      

    </Col>
  )
}

export default CryptoDetails