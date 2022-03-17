import React, { useState,useEffect } from 'react';

import Axios from 'axios';
import { Select, Typography, Row, Col, Input} from 'antd';

import { SwapOutlined } from '@ant-design/icons';

const { Option } = Select;

function Converter() {

// Initializing all the state variables
const [info, setInfo] = useState([]);
const [input, setInput] = useState(0.00);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("cny");
const [options, setOptions] = useState([]);
const [output, setOutput] = useState(0.00);

// Calling the api whenever the dependency changes
useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
  // console.log('res', res)
	})
}, [from]);

// Calling the convert function whenever
// a user switches the currency
useEffect(() => {
	setOptions(Object.keys(info));
	convert();
}, [info])
	
function convert() {
	var rate = info[to];
	setOutput(input * rate);
}

function flip() {
	var temp = from;
	setFrom(to);
	setTo(temp);
}

return (
  <>
      <Typography.Title className='head-title search-crypto' level={2}>Currency Converter</Typography.Title>
      <Row className='head-container'  >
            <Col span={12}><Typography.Title level={3}> Amount: </Typography.Title></Col>
            <Col span={12}>
              <Input.Search 
              placeholder="Enter Number.." 
              enterButton="Convert"
              size="large"
              onChange={(e) => setInput(e.target.value)}
              onSearch={()=>convert()}
              />
              </Col>
              <Col span={8}>
              <Select
                showSearch
                placeholder="From Currency"
                optionFilterProp="children"
                onChange={(e)=> {setFrom(e)}}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={from}
              >
                {options?.map((item,i)=>(
                  <Option key={i} value={item}>{item.toUpperCase()}</Option>
                ))}
              </Select>
              </Col>
              <Col span={8}>
              <SwapOutlined style={{ fontSize: '200%'}} onClick={()=>flip()}/>
              </Col> 
              <Col span={8}>
              <Select
                showSearch
                placeholder="To Currency"
                optionFilterProp="children"
                onChange={(e)=> setTo(e)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={to}
              >
                {options?.map((item,i)=>(
                  <Option key={i} value={item}>{item.toUpperCase()}</Option>
                ))}
              </Select>
              </Col>
      
              <Col span={24}> 
              <Typography.Title className='search-crypto' level={4}>Converted Amount:</Typography.Title>
              <p className='search-crypto' >{input+" "+from.toUpperCase()+" = "+output.toFixed(2) + " " + to.toUpperCase()}</p>
              </Col>
        </Row>

  </>
);
}

export default Converter;
