import React from "react";
import { Rate } from "antd";
import style from "../styles/StoreDetails.module.css";
import RatingBar from "./RatingBar";

const CustomerRatings = ({ reviewsStats }) => {
  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
  return (
    <div className={style.customer_ratings_inner}>
      <div className={style.rating_star}>
        <Rate
          disabled
          allowHalf
          tooltips={desc}
          value={reviewsStats?.averageRating}
        />
        <span className={style.rate_text}>
          {reviewsStats.averageRating} out of 5
        </span>
      </div>
      <p>{`${reviewsStats.totalNoOfRatings} Customer Reviews`} </p>
      <ul className={style.rating_bars}>
        <RatingBar ratingsPercentages={reviewsStats?.ratings} />
      </ul>
    </div>
  );
};

export default CustomerRatings;
