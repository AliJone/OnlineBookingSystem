import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Card } from "antd";
import Main from "../../../../../components/layout/Main";
import ServiceDetailCard from "../../../../../components/storeDetails/ServiceDetailCard";
import ServiceDetailGallery from "../../../../../components/storeDetails/ServiceDetailGallery";
import { useRouter } from "next/router";
import PageTitle from "../../../../../components/PageTitle";
import Loader from "../../../../../components/Loader";
import EmptyData from "../../../../../components/Empty";
import { getOneService } from "../../../../../services/services/api/storeDetails";

export default function Details() {
  const router = useRouter();
  const ids = router.query
  console.log(ids)
  let { storeId, serviceId } = ids
  const [serviceDetail, setServiceDetail] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalServices, setTotalServices] = useState();
  const [loading, setLoading] = useState();
  const [cardsLoader, setCardsLoader] = useState(true);
  const [reLoad, setReLoad] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  //   const { dispatch, state } = useContext(AppContext);
  //   const { userInfo } = state;

  const stats = [
    {
      amount: `$ ${totalRevenue ? totalRevenue : "0"}`,
      title: "Store Revenue",
      icon_src: "/assets/images/economy.png",
      percent: totalRevenue ? "15" : "0",
    },
    {
      amount: `${totalServices ? totalServices : ""} Services`,
      title: "Store Services Availed",
      icon_src: "/assets/images/customerService.png",
      percent: totalServices ? "35" : "0",
    },
  ];

  const serviceDetails = async () => {
    try {
      setLoading(true);
      if (router?.isReady) {
        console.log("thisId", ids.servId)
        let { data, response } = await getOneService(ids.servId);
        console.log(data)
        if (response.status === 200) {
          setServiceDetail(data.data);
          // console.log(data.data.gallery)
          setGalleryImages(data?.data?.gallery);
          // console.log("GImgs",data.data.gallery)
          setLoading(false);
        }
        setReLoad(false);
      }
    } catch (err) {
      setLoading(false);
      setReLoad(false);
      console.log("error", err);
    }
  };
  useEffect(() => {
    // fetchCardStats();
    // CreatBreadcurm();
    serviceDetails();
  }, [router?.isReady]);

  useEffect(() => {
    serviceDetails();
  }, [reLoad]);



  const CreatBreadcurm = () => {
    try {
      let { storeId } = router?.query;
      const breadcurms = [
        {
          Page: "Dashboard",
          pageLink: "/admin/dashboard",
        },
        {
          Page: "Stores",
          pageLink: "/admin/store",
        },
        {
          Page: "Stores Detail",
          pageLink: `/admin/store/${storeId}`,
        },
        {
          Page: "Stores Services",
          pageLink: `/admin/store/${storeId}/services`,
        },
        {
          Page: "Service Detail",
        },
      ];
      //       dispatch({ type: "BREADCRUMBS", payload: breadcurms });
    } catch (error) { }
  };

  return (
    <>
      {loading ? <Loader /> : <div>
        <PageTitle title="Service Details" />
        <Row gutter={[0, 18]}>
          <Row gutter={[8, 0]} style={{ width: "100%" }}>
            <Card
              bordered={false}
              className="header-solid mb-24"
            >
              <Col span={24}>

                <ServiceDetailCard
                  deleteService={() => deleteService()}
                  serviceData={serviceDetail ? serviceDetail : null}
                  setServiceDetail={setServiceDetail}
                />

                <EmptyData description="No Details Available" />

              </Col>
            </Card>
          </Row>

          <Col span={24}>
            <ServiceDetailGallery
              images={galleryImages}
              setReLoad={setReLoad}
            />
          </Col>

        </Row>
      </div>}

    </>
  );
}
Details.layout = Main;
