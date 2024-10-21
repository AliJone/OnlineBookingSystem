import { Image, Rate, Input, Button, Form } from 'antd';
import moment from 'moment';
import React from 'react';
import EmptyData from './EmptyData';
import style from './../styles/StoreDetails.module.css';

const SingleReviewWithReply = (props) => {
  if (props?.review?.length) {
    return props?.review.map((review, index) => {
      return (
        <div className={style.single_reviews_wrapper} key={review?._id}>
          <div className={style.customer_title}>
            <div className={style.customer_img}>
              <Image
                src={'/assets/images/customer_avatar.png'}
                alt=''
                preview={false}
                width={50}
              />
            </div>
            {(review?.customer?.firstName && review?.customer?.lastName) ?

            <div>
              <h4>{`${review?.customer?.firstName} ${review?.customer?.lastName}`}</h4>
              <p>{moment(review?.createdAt).format('DD MMMM YYYY')}</p>
            </div>: <div><h4>No Name</h4> <p>{moment(review?.createdAt).format('DD MMMM YYYY')}</p></div> 
            }
          </div>
          <Rate disabled allowHalf value={review?.rating} />
          <p>{review?.comment}</p>
          {props?.onClick ? (
            <div className={style.reply_wrapper}>
              <Form onFinish={props?.onClick}>
                <Form.Item name='reply'>
                  <Input placeholder='Reply' />
                </Form.Item>
                <Button type='link' htmlType='submit'>
                  Reply
                </Button>
              </Form>
            </div>
          ) : null}
        </div>
      );
    });
  } else {
    return <EmptyData description='No Review Available' />;
  }
};

export default SingleReviewWithReply;
