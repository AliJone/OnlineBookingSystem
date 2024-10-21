import { useEffect, useState } from "react";
// import Style from "../../../styles/Home.module.css"
import Style from "../../../../styles/StoreDetails.module.css"
import { storeDetails, getServices, getPackages, getEmployees, getReviewStats, getReviews } from "../../../../services/services/api/storeDetails";
import ServicesAndPackages from "../../../../components/storeDetails/ServicesAndPackages";
import Loader from "../../../../components/Loader";
import Employees from "../../../../components/storeDetails/Employees";
import Main from "../../../../components/layout/Main";
import Reviews from "../../../../components/storeDetails/Reviews"

import {
  Row,
  Col,
  Card,
  List,
  Image,
  Avatar,
  message,
  Typography,
  Tag,
  Tabs,
} from "antd";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

import {
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import convesionImg from "../../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../../assets/images/face-4.jpg";
import location_icon from "../../../../assets/images/location_icon.png"

import project1 from "../../../../assets/images/home-decor-1.jpeg";
import { useRouter } from "next/router";

export default function StoreDetails() {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState([]);
  const [storeServices, setStoreServices] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [storeTime, setStoreTime] = useState('');
  // const [loading, setLoading] = useState(true)

  let router = useRouter()
  let id = router.query
  // console.log(id)

  useEffect(() => {
    store()
    services()
    packages()
    fetchEmployees()
    fetchReviews()
    fetchReviewStats()
  }, [router?.isReady])

  const store = async () => {
    try {

      const { data, res } = await storeDetails(id);
      setStoreData(data.data)
      setLoading(false)
      setStoreServices(data.data.serviceCategories)
      setStoreTime(data.data.timings)
      console.log("data 1", storeData)
      console.log("data 2", data)
    } catch (err) {
      throw (err)
    }

  }

  const services = async () => {
    try {

      const { data, res } = await getServices(id);
      setAllServices(data.data.docs)
      console.log("Serv: ", data.data.docs)
      console.log("services ki api", data)
    }
    catch (err) {
      throw (err)
    }

  }

  const packages = async () => {
    try {

      const { data, res } = await getPackages(id);
      setAllPackages(data.data.docs)
      console.log("Packages: ", data.data.docs)
    }
    catch (err) {
      throw (err)
    }

  }
  const fetchEmployees = async () => {
    try {

      const { data, res } = await getEmployees(id);
      setAllEmployees(data.data)
      console.log("Employees: ", data.data)
    }
    catch (err) {
      throw (err)
    }

  }

  const fetchReviews = async () => {
    try {

      const { data, res } = await getReviews(id);
      setAllReviews(data.data)
      console.log("Reviwes: ", data.data)
    } catch (err) {
      throw (err)
    }

  }


  const fetchReviewStats = async () => {
    try {
      const { data, res } = await getReviewStats(id);
      setAllRatings(data.data)
      console.log("STats: ", data.data)


    } catch (err) {
      throw (err)
    }

  }



  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );


  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
  ];

  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Today’s Users",
      title: "3,200",
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
  ];






  // console.log(`${storeData.timings?.[0]?.openingTime} ~ ${storeData.timings?.[0]?.closingTime}`)
  // console.log(storeTime[0])
  console.log("employess data", allEmployees)

  return (

    <>

      {loading ? <Loader /> : <div className="layout-content">

        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{item.today}</span>
                      <Title level={3}>
                        {item.title} <small className={item.bnb}>{item.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{item.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="rowgap-vbox" ></Row>

        <div>

          <Card
            bodyStyle={{ display: "none" }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]}>
                <Col span={24} md={12} className="col-info">
                  <Avatar.Group>
                    <Avatar size={74} shape="square" src={storeData?.logo?.url} />

                    <div className="avatar-info" style={{ padding: '15px' }}>
                      <h4 className="font-semibold m-0">{storeData.name}</h4>
                      <p><span style={{ color: 'black' }}>Contact No: </span>+{storeData.phoneNo}</p>
                    </div>
                  </Avatar.Group>
                </Col>
                <Col
                  span={24}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div>
                    <div className={Style.store_service_staff_review}>
                      <ul>
                        <li>
                          <h4>
                            {storeServices.length}
                            <span> Services</span>
                          </h4>
                        </li>
                        <li>
                          <h4>
                            {storeData.noOfEmployees}
                            <span> Staff</span>
                          </h4>
                        </li>
                        <li>
                          <h4>
                            {storeData.averageRating}
                            <span> Reviews</span>
                          </h4>
                        </li>
                      </ul>
                    </div>
                  </div>


                </Col>
              </Row>
            }
          ></Card>
        </div>
        <br />

        <Row gutter={[24, 0]}>
          <Col span={24} md={16} className="mb-24 ">
            <Card
              bordered={false}
              className="header-solid h-full"
              title={<h6 className="font-semibold m-0">ABOUT</h6>}
            >
              <p>{storeData.description}</p>
              <div className="map-clock-div" >
                <Row className={Style.contact_section}>
                  <Col span={12} className='store_timing'>
                    <img
                      style={{ width: "14px", marginBottom: 3 }}
                    />

                  </Col>
                </Row>
                <div className={Style.store_location_time}>
                  <div className={`${Style.store_location} address-location-section`}>
                    <h3>
                      <Image
                        src={location_icon}
                        alt=""
                        preview={false}
                        style={{
                          width: "18px",
                          marginTop: "2px",
                          marginLeft: "-5px",
                          marginRight: "5px",
                        }}
                      />
                      <img
                        src="/google-map-icon.webp"
                        alt="www"
                        width={28}
                        height={20}
                      />
                      <a
                        onClick={() =>
                          window.open(
                            "https://maps.google.com?q=" +
                            storeData?.location?.coordinates?.[1] +
                            "," +
                            storeData?.location?.coordinates?.[0]
                          )
                        }
                      >
                        {" "}
                        {storeData.address}
                      </a>
                    </h3>
                  </div>
                  <div className={Style.store_day}>
                    <img src={""} />
                    <span>Monday - Friday</span>
                  </div>
                </div>
              </div>
              {/* <p>{storeData.timing[0]}</p> */}

            </Card>
          </Col>

          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={false}
              title={<h6 className="font-semibold m-5">Services Categories</h6>}
              className="header-solid h-full"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <List
                itemLayout="horizontal"
                dataSource={storeData.serviceCategories}
                split={false}
                className="conversations-list"
                renderItem={(item) => (
                  <Tag className={Style.service_tag}>{item.title}</Tag>
                )}
              />
            </Card>
          </Col>
        </Row>


        <Row>
          <Tabs defaultActiveKey="1" className='tab-view'>
            <TabPane tab="Services" key="1" className="services-tab" >
              <ServicesAndPackages
                data={allServices}
                loader={false}
                title={
                  <>
                    <div className="total-services-h4-h6">
                      <h4>Services   </h4>
                      <h6> Total Services : {allServices.length}  </h6>
                    </div>
                  </>
                }
                storeId={router.query}
              />
            </TabPane>
            <TabPane tab="Packages" key="2" className="packages-tab" > 
              <ServicesAndPackages
                data={allPackages}
                loader={false}
                title={
                  <div className="total-services-h4-h6">
                    <h4>Packages</h4>
                    <h6> Total Packages : {allPackages.length}  </h6>
                  </div>
                }
              />
            </TabPane>
            <TabPane tab="Specialists" key="3">
              <Employees
                data={allEmployees}
                employeeList={allEmployees}
                title={
                  <div className="total-services-h4-h6">
                    <h4> Employees  </h4>
                    <h6> Total Employees : {allEmployees.length}  </h6>
                  </div>
                }

              />
            </TabPane>
            <TabPane tab="Reviews" key="4">
              <Reviews stats={allRatings} reviews={allReviews} />
            </TabPane>
          </Tabs>
        </Row>

      </div>}


    </>

  );
}
StoreDetails.layout = Main;

