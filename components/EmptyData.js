import React from 'react'
import { Empty } from 'antd';


const EmptyData = ({description}) => {
  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description}/>   
  )
}

export default EmptyData

