import { Progress } from "antd";
import React from "react";
import Card from "../CardTitle";
import { CaretDownOutlined, LineChartOutlined } from "@ant-design/icons";
const StatsWigdet = ({ title, icon_src, amount, percent }) => {
  return (
    <Card className="stat_widget">
      <div className="stat_content">
        <div className="status-icon">
          <img src={icon_src} />
        </div>
        <div>
          <span className="title">{title} </span>
          <h4 className="amount">{amount}</h4>
        </div>
      </div>
      <Progress
        className="stats-progress-bar"
        percent={percent}
        showInfo={false}
      />
      <div className="stat-footer">
        <div className="stats-percentage">
          <LineChartOutlined />+{percent}%
        </div>
        <div className="stats-footer-icon">
          <CaretDownOutlined rotate={320} />
        </div>
      </div>
    </Card>
  );
};

export default StatsWigdet;
