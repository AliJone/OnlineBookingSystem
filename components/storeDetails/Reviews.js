import CardTitle from "../CardTitle";
import DefaultButton from "../Button/Button"
import Styles from "../../styles/StoreDetails.module.css"
import CustomerRatings from "../CustomerRatings"
import CustomerReviews from "../CustomerReviews"
import Router from "next/router";

import {
  Card, Col, Row, Button,
} from "antd";

export default function Reviews({ stats, reviews }) {
  return (
    <>

      <Card>

        <div className="review-rating-button">
          <CardTitle
            title={`Reviews & Ratings `}

          />


          <Button type="link" className="view-all-btn" onClick={()=> Router.push({pathname:"/admin/stores/reviews"})} > View All</Button>

          
        </div>


          <Row gutter={[16, 16]} className="customer-main-row">


            <Col span={8} className="customer-big-rating">
              <div className="rating_wrapper">
                <CardTitle title="Customer Ratings" />
                <CustomerRatings reviewsStats={stats} />
              </div>
            </Col>

            <div class="vl"></div>



            <Col span={12} className="customer-all-rating">
              <div className="reviews_wrapper">
                <CustomerReviews userReview={reviews} />
              </div>
            </Col>

          </Row>
      </Card>
    </>
  );
};
