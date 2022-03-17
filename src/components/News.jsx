import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/CryptoApi';
import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
  const count = simplified? 6:20
  const {data:cryptos} = useGetCryptosQuery(50)
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const {data:newsList, error, isFetching} = useGetCryptoNewsQuery({newsCategory,count})
  
  console.log('newsList', newsList)


  if (isFetching) return <Loader />;
  
  return (
    <> 
      {!simplified && (<Typography.Title level={2} className='search-crypto head-title'>Crypto News</Typography.Title>)}
      
      <Row gutter={[32,32]} className="crypto-card-container">
      {!simplified && (
        <Col span={24} className='search-crypto'>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value="Cryptocurency">Cryptocurrency</Select.Option>
            {cryptos?.data?.coins?.map((item) => <Select.Option value={item.name}>{item.name}</Select.Option>)}
          </Select>
          
        </Col>
        
      )}
        {newsList.value?.map((item,i)=>(
          <Col 
            xs={24}
            sm={12}
            lg={8}
            key={i}
          >
            <Card hoverable bordered={true} className="news-card">
              <a href={item.url} target="_blank" rel="noreferrer">
                <div className='news-image-container'>
                  <Typography.Title level={4} className='news-title'>{item.name}</Typography.Title>
                  <img style={{maxWidth:'100px', maxHeight:'100px'}} src={item?.image?.thumbnail?.contentUrl || demoImage}></img>
                </div>
                <p>{item.description.length>80 ? `${item.description.substring(0, 100)}......`:item.description}</p>
                <div className="provider-container">
                <div>
                  <Avatar src={item.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Typography.Text className="provider-name">{item.provider[0]?.name}</Typography.Text>
                </div>
                <Typography.Text>{moment(item.datePublished).startOf('ss').fromNow()}</Typography.Text>
              </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News