import { Card, Image, Tag, message, Space, Button } from "antd";
import React, { useState } from "react";
import Style from "../../styles/StoreDetails.module.css";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
// import * as serviceApi from "../../services/api/services";
import Loader from "../Loader";

const ServiceDetailCard = ({
  serviceData,
  deleteService,
  editService,
  setServiceDetail,
}) => {
  const [thumbnailLoader, setThumbnailLoader] = useState(false);
  const router = useRouter();

  let { storeId, serviceId } = router?.query;

  const onThumbnailChange = async (thumbnail) => {
    try {
      setThumbnailLoader(true);
      if (thumbnail?.size / 1000000 > 5) {
        message.error("Maximum Image Size Is 5 MB");
      } else {
        let thumbnailImage = new FormData();
        thumbnailImage.append("thumbnailImage", thumbnail);
        thumbnailImage.append("serviceId", serviceId);
        let { response, data } = await serviceId?.updateThumbnail(
          thumbnailImage
        );
        if (response.status === 200) {
          message.success("Thumbnail Updated successfully!");
          setServiceDetail({ ...serviceData, thumbnail: data?.data });
          setThumbnailLoader(false);
        }
      }
      setThumbnailLoader(false);
    } catch (error) {
      setThumbnailLoader(false);
      throw error;
    }
  };


  return (
    <div className="store-services-inner-card">
    <Card>
      <div className={`box_shadow ${Style.service_detail_card_wrapper}`}>
        <div
          className={`${Style.service_img} ${Style.service_detail_img_wrapper} edit_img_wrapper`}
        >
          {serviceData?.discountPercent === 0 ||
            serviceData?.discountPercent === null ? null : (
            <Tag
              className={`status blue_tag ${Style.service_discount_tag} ${Style.service_detail_discount_tag}`}
            >
              {`${serviceData?.discountPercent}%`}
            </Tag>
          )}
          {thumbnailLoader ? (
            <Loader />
          ) : (
            <>
              <Image
                src={serviceData?.category?.thumbnail?.url}
                alt=""
                className={Style.service_detail_img}
                preview
                width="100%"
              />
            </>
          )}
        </div>
        <div className={Style.service_card_detail} style={{ "display": 'flex' }}>
          <div
            className={`${Style.service_title} ${Style.service_detail_title}`}  
            style={{ "display": "block" }}
            id="packages-inside-active-div"
          >
            <h2 className="h2-active-div">
              Name:  <span className={Style.card_span}> {serviceData?.name}</span>            
            </h2>

            <div className="active-ka">
              <Tag

                className={`status ${serviceData?.isActive ? "active_status" : "inactive_status"
                  } ${Style.store_status}`}
              >
                <div className="store-inner-active">
                {serviceData?.isActive ? "Active" : "Inactive"}
                </div>
              </Tag>
            </div>
            {/* <Space>
              {serviceData?.isPackage ? (
                <Tag className={`status brown_tag ${Style.store_status}`}>
                  Packagess
                </Tag>
              ) : null}

            </Space> */}
          </div>
          <h2 className={Style.card_tittle}>
            Description:{" "}
            <span className={Style.card_span}>{serviceData?.description}</span>
          </h2>
          <h2 className={Style.card_tittle}>
            Duration:{" "}
            <span className={Style.card_span}>
              {" "}
              <span className={Style.service_price}>
                {serviceData?.duration}{" "}
              </span>
              Minutes
            </span>
          </h2>
          <h2 className={Style.card_tittle}>
            Discount:{" "}
            <span className={Style.card_span}>
              {" "}
              <span className={Style.service_price}>
                {serviceData?.discountPercent}
              </span>
              %
            </span>
          </h2>
          <h3 className={Style.service_price}>
            <span className={Style.card_tittle}>Price: </span> $
            {serviceData?.discountPercent === 0 ||
              serviceData?.discountPercent === null
              ? serviceData?.price
              : Math.round(serviceData?.discountedPrice)}{" "}
            {serviceData?.discountPercent === 0 ||
              serviceData?.discountPercent === null ? null : (
              <sup>
                <del>${serviceData?.price}</del>
              </sup>
            )}
          </h3>
        </div>
        <div className={Style.service_details_section}>
          <p className={Style.service_details_instruc}>
            {" "}
            <span>Instructions: </span>
            {serviceData?.instructions != "null"
              ? serviceData?.instructions
              : "N/A"}
          </p>
        </div>
      </div>
    </Card>
    </div>
  );
};

export default ServiceDetailCard;
