import React, { useState, useEffect } from 'react';
import CardTitle from './CardTitle';
import style from './../styles/StoreDetails.module.css';
import SingleReviewWithReply from './SingleReviewWithReply';

const CustomerReviews = (props) => {
  console.log(props?.userReview)
  return (
    <div className={style.customer_reviews_inner}>
      <CardTitle title='Customer Reviews' />
      <SingleReviewWithReply review={props?.userReview?.slice(0,4)} />
    </div>
  );
};

export default CustomerReviews;
