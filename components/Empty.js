import React from "react";
import { Empty } from "antd";
const EmptyData = ({ description }) => {
  return (
    <div className="not_found">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
    </div>
  );
};

export default EmptyData;
