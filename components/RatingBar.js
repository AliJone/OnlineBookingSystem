import React, { useState } from "react";
import { Progress } from "antd";
import style from './../styles/StoreDetails.module.css';
const RatingBar = ({ ratingsPercentages }) => {
  let objectNo = 6;
  return (
    <>
      {ratingsPercentages &&
        Object.keys(ratingsPercentages)?.map((item, index) => {
          objectNo = objectNo - 1;
          console.log("ratingsPercentages" , ratingsPercentages[objectNo]?.percent)
          return (
            <li key={item}>
              <span className={style.star_count}>{objectNo} Star</span>
              <Progress
                strokeColor="#FADC32"
                percent={ratingsPercentages[objectNo]?.percent}
                strokeWidth={12}
                trailColor="#C4C4C4"
              />
            </li>
          );
        })}
    </>
  );
};

export default RatingBar;
