import { Card, Radio, Space, Dropdown, Typography, DownOutlined, Select } from 'antd'
import React from 'react'

const TableCard = ({ children, extra, title }) => {



  return (
    <div>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24" 
        title = {title}
        
        extra={
          <>
            {extra ? extra : null}








          </>
        }
      >
        {children}</Card>
    </div>
  )
}

export default TableCard
