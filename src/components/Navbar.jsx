import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined} from '@ant-design/icons';

import logoPic from '../imgs/air-cooler.png'

const Navbar = () => {
  
  const [collapsed, setCollapsed] = useState(false)

  // Resize based on window
  const [screenSize, setScreenSize] = useState(undefined);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [screenSize]);
  
  
  return (
    <div className='nav-container'>
      <div className='logo-container'>
            <Avatar src={logoPic} size="large" />
            <Typography.Title level={1} className="logo head-title" ><Link to="/">CryptoHub</Link></Typography.Title>
            <Button type="primary" onClick={() => setCollapsed(!collapsed)} className='menu-control-container'>
            {collapsed? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} 
            </Button>
      </div>
      {collapsed &&
      (
        <Menu theme='dark'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FundOutlined />}>
            <Link to="/converter">Money Converter</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Coins info</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<MoneyCollectOutlined />}>
            <Link to="/">More to come...</Link>
            
          </Menu.Item>
        </Menu>
      )}
    </div>
    );
}
export default Navbar