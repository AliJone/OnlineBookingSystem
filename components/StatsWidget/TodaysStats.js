import { Image } from 'antd';
import React from 'react';

const TodaysStats = ({ title, counts, icon, className }) => {
  return (
    <div className={`today_stats ${className}`}>
      <div className='today_stats_content'>
        <h3>{counts}</h3>
        <h4>{title}</h4>
      </div>

      <Image src={icon} alt='' preview={false} width={80} />
    </div>
  );
};

export default TodaysStats;
