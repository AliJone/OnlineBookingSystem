import { Col, Image } from "antd";
import React, { useState } from "react";
import Loader from "../Loader";
import { UploadOutlined } from "@ant-design/icons";
import style from "../../styles/StoreDetails.module.css";
// import Style from './StoreDetails.module.css';

const GalleyGroup = ({ index, item, deleteService }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Col key={index} span={6}>
      <div
        className={`${style.service_gallery_image_wrapper} edit_img_wrapper`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ul
              className={`${style.service_actions} ${style.service_detail_action}`}
            >
              <li>
                <Image
                  src="/assets/images/delete_service.png"
                  alt=""
                  preview={false}
                  width={35}
                  onClick={deleteService}
                />
              </li>
            </ul>

            <Image
              className={`${style.service_gallery_image}`}
              width={"100%"}
              height={240}
              src={item?.url}
            />
            </>
        )}
      </div>
    </Col>
  );
};

export default GalleyGroup;
