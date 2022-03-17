import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space ,Divider} from 'antd';

import {Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News, Converter} from './components';
import './App.css';


const App = () =>{
  return (
    <div className='app'>
      <div className='navbar'>
          <Navbar/>
          
      </div>
      <div className='main'>
        
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/converter" element={<Converter />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />}/>
              <Route path="/coin/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />}/>
            </Routes>
          </div>
        </Layout>

        <div className='footer'>
          <Typography.Title level={5} style={{color: 'gray', textAlign:'center'}} >
          <Link to="/">Gengcong Yan.</Link>
          <br/>
          @2022
          </Typography.Title>
          <Space split={<Divider type="vertical" />}>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Money Exchange</Link>
          <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App;