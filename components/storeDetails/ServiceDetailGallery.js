import { Button, Col, Image, Row, message, Modal, Form, Upload, Card } from "antd";
import React, { useState } from "react";
// import Card from "../CardTitle";
import style from "../../styles/StoreDetails.module.css"
import { useRouter } from "next/router";
// import * as serviceApi from "../../services/api/services";
import GalleyGroup from "../../components/storeDetails/GalleyGroup"
import Empty from "../../components/Empty";
import DefaultButton from "../Button/Button";
// import Swal from "sweetalert2";
const ServiceDetailGallery = ({ images, setGalleryImages, setReLoad }) => {
  const router = useRouter();
  let { serviceId } = router?.query;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
 
  const Create = async (data) => {
    try {
      setLoading(true);
      let { galleryImages } = data;
      console.log("data" , data)
      let galleryImageData = new FormData();
      for (let i = 0; i < galleryImages?.length; i++) {
        galleryImageData.append("galleryImages", galleryImages?.[i]?.originFileObj);
      }
      galleryImageData.append("serviceId", serviceId);
      let {
        response: { status },
      } = await serviceApi?.appendImageGallery(galleryImageData);
      if (status == 200) {
        setReLoad(true);
        setVisible(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
console.log("Display Images", images)
  const normFile = (e) => {
    let file = e;
    let fileList = file.fileList;
    if (file?.file?.size / 1000000 > 5) {
      fileList = [];
      const array = file?.fileList.pop();
      message.error("Maximum Image Size Is 5 MB");
    }
    return file && fileList;
  };
  return (
    <>
    <div className="store-inner-gallery-image-div">
      <Card className={`${style.service_gallery_wrapper}`}>
        <div className={`${style.service_add_image}`}>
          <div className="gallery-image-div">
            <h4>Gallery Image </h4>
            {/* <Button className="gallery-button">Add Image</Button> */}
          </div>
        </div>
        {images?.length == 0 ? (
          <Col span={24}>
            <Empty description="No Images Available" />
          </Col>
        ) : (
        
            <Row gutter={[18, 18]}>
              {images?.map((item, index) => {
                return (
                  <>
                  <GalleyGroup
                    item={item}
                    index={index}
                    deleteService={() => deleteService(item)}
                  />
                 </>
                );
              })}
            </Row>
          
        )}
      </Card>
      </div>
    </>

  );
};

export default ServiceDetailGallery;
