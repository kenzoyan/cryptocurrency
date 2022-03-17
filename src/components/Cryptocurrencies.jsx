import React ,{useState, useEffect} from 'react'

import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography, Space } from 'antd';

import { useGetCryptosQuery } from '../services/CryptoApi';

import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified? 8:50
  const {data:cryptosList, error, isFetching} = useGetCryptosQuery(count)
  const [cryptos ,setCryptos] = useState()
  const [searchText, setSearchText] = useState('')

  useEffect(()=>{
      setCryptos(cryptosList?.data?.coins)

      const filterData = cryptosList?.data?.coins.filter((item)=>item.name.toLowerCase().includes(searchText));
      setCryptos(filterData)
  },[cryptosList,searchText])

  if (isFetching) return <Loader />;

  // console.log('cryptos', cryptos)
  
  return (
    <> 
    {!simplified && (<Typography.Title level={2} className='search-crypto head-title'>Global Coins Info</Typography.Title>)}
    {!simplified && (
      <div className='search-crypto'>
      <Input.Search placeholder="Search Cryptocurrency" allowClear onChange={(e) => setSearchText(e.target.value.toLowerCase())} style={{ width: 200 }} />
      </div>
      )}

      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((item)=>(
          <Col 
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={item.uuid}
          >
            <Link key={item.uuid} to={`/coin/${item.uuid}`}>
            <Card title={`#${item.symbol} : ${item.name}`} bordered={false} extra={<img className="crypto-image" src={item.iconUrl} />}>
              <Typography.Title level={4} mark> Price: {millify(item.price)}</Typography.Title>
              <Typography.Title level={5}> Change: {millify(item.change)}</Typography.Title>
              <Space direction="vertical">
              <Typography.Text  > MarketCap: {millify(item.marketCap)}</Typography.Text>
              <Typography.Text  > 24hVolume: {millify(item['24hVolume'])}</Typography.Text>
              </Space>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies