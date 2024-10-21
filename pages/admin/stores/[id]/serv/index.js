import React, { useState, useEffect, useContext } from "react";
import Main from "../../../../../components/layout/Main";
import { Card, Col, Row, Tabs } from "antd";
import ServiceCard from "../../../../../components/ServiceCard";
import { useRouter } from "next/router";
import Loader from "../../../../../components/Loader";
import Empty from "../../../../../components/Empty";
import { getServices , getPackages } from "../../../../../services/services/api/storeDetails";
const { TabPane } = Tabs;

export default function Serv() {

  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);


  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  //   const { dispatch } = useContext(AppContext);
  let id = router.query
  console.log(id)
  const fetchServices = async () => {
    try {
      setLoader(true);
      if (router?.isReady) {
        // let { id } = router?.query;
        let { data, response } = await getServices(id);
        console.log("dats ", data)
        if (response.status === 200) {
          setAllServices(data.data.docs)

          setServices(data.data.docs);
          setLoader(false);
          console.log("Servs", data.data.docs)
        }
      }
    } catch (err) {
      setLoader(false);
      console.log("error", err);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoader(true);
      if (router?.isReady) {
        // let { id } = router?.query;
        let { data, response } = await getPackages(id);
        if (response.status === 200) {
          setAllPackages(data.data.docs)
          setPackages(data.data.docs);
          setLoader(false);
          console.log(packages)
          console.log(data.data.docs)
        }
      }
    } catch (err) {
      setLoader(false);
      console.log("error", err);
    }
  };
  useEffect(() => {
    CreatBreadcurm();
    fetchServices();
    fetchPackages();
  }, [router?.isReady]);

  const CreatBreadcurm = () => {
    try {
      if (router?.isReady) {
        let { id } = router?.query;
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
            pageLink: `/admin/store/${id}`,
          },
          {
            Page: "Stores Services",
          },
        ];
        // dispatch({ type: "BREADCRUMBS", payload: breadcurms });
      }
    } catch (error) { }
  };

  return (
    <div className="services_wrapper">
      <Row gutter={[20, 20]}>
        <Col span={24}>


          <Tabs defaultActiveKey="1" className="tab-view" centered>
            <TabPane tab="Services" key="1">

              <Card className="services-view-all-cards">

                {/* <div className="box_heading flex_heading vo">
                  <PageTitle title="Services" />
                </div> */}


                <div className="view-all-services-h4-h6">
                  <h2>Services   </h2>
                  <h6> Total Services : {allServices.length}  </h6>
                </div>



                <div className="service-cardss">

                  <Row className="tp" gutter={[20, 20]}>



                    {loader ? (
                      <Col span={24}>
                        <Loader tip="Loading Services..." />
                      </Col>
                    ) : services?.length != 0 ? (
                      services?.map((cur, index) => {

                        return (
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
                                  // query: cur?.id,
                                })
                              }
                            />
                          </Col>
                        );
                      })
                    ) : (
                      <Empty description="No Services Available" />
                    )}
                  </Row>
                </div>

              </Card>

            </TabPane>
            <TabPane tab="Packages" key="2">

              <Card className="services-view-all-cards">


                <div className="view-all-services-h4-h6">
                  <h2>Packages   </h2>
                  <h6> Total Packages : {allPackages.length}  </h6>
                </div>


                <div className="service-cardss">

                  <Row gutter={[20, 20]}>




                    {loader ? (
                      <Col span={24}>
                        <Loader tip="Loading Packages..." />
                      </Col>
                    ) : packages.length != 0 ? (
                      packages?.map((cur, index) => {
                        return (
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
                                  pathname: `/admin/store/${id.id}/serv/${cur?._id}`,
                                  // pathname: `/admin/store/${router?.query?.id}/services/${cur?._id}`,
                                })
                              }
                            />
                          </Col>
                        );
                      })
                    ) : (
                      <Empty description="No Packages Available" />
                    )}
                  </Row>
                </div>

              </Card>

            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
Serv.layout = Main;
