import React from 'react'
import { useState } from 'react'
import { ConfigProvider } from 'antd'
import { Radio, Space, Input } from 'antd';

export default function StatusFilter() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#F8C70E', fontFamily: 'monospace' } }}>
      <h1 className='mt-8 font-mono text-lg text-[#F8C70E]'>Tình trạng</h1>

      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Còn hàng</Radio>
          <Radio value={2}>Hết hàng</Radio>
          <Radio value={3}>Đang diễn ra</Radio>
          <Radio value={4}>Sắp diễn ra</Radio>
          <Radio value={5}>Đã kết thúc</Radio>
        </Space>
    </Radio.Group>
    </ConfigProvider>
  )
}
