import Loader from "../Loader"
import Empty from "../Empty";
import CardTitle from "../CardTitle";
import ServiceCard from "../ServiceCard";
import DefaultButton from "../Button/Button"
import Styles from "../../styles/StoreDetails.module.css"
import {
  Button,
  Row,
  Col,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";



export default function ServicesAndPackages({ data, loader, title }) {
  const router = useRouter()
  const id = router.query
  console.log(id, router.pathname, router.query)
  return (
    <>
      <div className="packages-cards-bg">

        <Row gutter={[20, 20]}>
          <Col span={24}>

            <CardTitle
              title={title}
              className="tab-header"
              extra={
                <>

                  <Button type="link" className="view-all-btn" onClick={() => { router.push({ pathname: `/admin/stores/${id.id}/serv` }) }} >View All</Button>



                  {/* <DefaultButton
                    title={<Button type="link" className="detail-btn">Details</Button>}
                    className="colored_btn"
                    onClick={() => {
                      router.push({
                        pathname: `/admin/stores/${id.id}/serv`,
                    });
                    }}
                  />{" "} */}
                </>
              }
            />
          </Col>


          {loader ? (
            <Col span={24}>
              <Loader />
            </Col>
          ) : data?.length ? (
            data?.slice(0, 4).map((cur, index) => {
              return (
                <>
                  <Col key={index} span={6}>
                    <ServiceCard
                      id={index}
                      image={cur?.thumbnail?.url}
                      title={cur?.name}
                      discountPercentage={cur?.discountPercent}
                      status={cur?.isActive}
                      description={cur?.description}
                      amount={cur?.price}
                      discountedPrice={cur?.discountedPrice}
                      onClick={() =>
                        router.push({
                          pathname: `/admin/stores/${id.id}/serv/${cur?._id}`,
                        })
                      }
                    />
                  </Col>
                </>
              );
            })
          ) : (
            <Col span={24}>
              <Empty description={`No ${title} Available`} />
            </Col>
          )}
        </Row>
      </div>

    </>
  );

};
