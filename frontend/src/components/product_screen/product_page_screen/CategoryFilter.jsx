import React from 'react'
import { useState } from 'react'
import { ConfigProvider } from 'antd'
import { Radio, Space, Input } from 'antd';

export default function CategoryFilter() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }}>
      <h1 className='mt-3 mb-1 font-mono text-lg text-[#F8C70E]'>Phân loại</h1>

      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Tất cả sản phẩm</Radio>
          <Radio value={2}>Bàn phím</Radio>
          <Radio value={3}>Bộ nút phím cơ</Radio>
          <Radio value={4}>Công tắc bàn phím</Radio>
        </Space>
    </Radio.Group>
    </ConfigProvider>
  )
}
