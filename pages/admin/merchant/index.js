// import React from "react";
import Main from "../../../components/layout/Main";
import DynamicTables from "../../../components/DynamicTables";
import * as merchantApi from "../../../services/services/api/dashboard";
import { React, useState, useEffect } from "react";
import TableCard from "../../../components/TableCard";
import styled from "styled-components";
import DefaultInput from "../../../components/Input/DefaultInput";
import Loader from "../../../components/Loader";

import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input


import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import Link from "next/link";
// import styled from "styled-components";
import avtar from "../../../assets/images/team-2.jpg";

import {
  Row,
  Col,
  Tabs,
  Select,
  Tag,
  Card,
  Typography,
  Drawer,
  Button,
  Switch,

} from "antd";

import Router from "next/router";
export default function Merchant(

  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
) {

  const { Title, Text } = Typography;

  const [merchant, setMerchant] = useState([]);

  const [merchantStats, setMerchantStats] = useState(null)

  const [loading, setLoading] = useState(false);

  const [totalMerchants, settotalMerchants] = useState(0)

  const [sidenavType, setSidenavType] = useState("transparent");

  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);


  const fetchAllMerchants = async () => {
    try {
      let {
        data: { data },
        response: { status },
      } = await merchantApi.allMerchants();

      setLoading(true);

      if (status == 200) {
        setMerchant(data);
        settotalMerchants(data)
        console.log("---dataa", data)

      }
      setLoading(true);

    } catch (error) {
      setLoading(true);
      console.log("Error in fetching Merchnats ", error.message);
    }
  };

  // console.log("merchant", merchant);


  useEffect(() => {
    fetchAllMerchants();
    merchantStatus();
  }, []);


  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );



  const merchantStatus = async () => {
    try {
      let {
        data: { data },
        response: { status },
      } = await merchantApi.merchantStatus();

      setLoading(false);

      if (status == 200) {
        setMerchantStats(data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in fetching Merchnats ", error.message);
    }
  };



  // icons code

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

  const cart = [
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
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

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

  // table code start

  const count = [

    {
      today: "Active",
      title: merchantStats?.activeMerchant,
      icon: dollor,
      // persent: "Merchants",
      bnb: "bnb2",
    },
    {
      today: "Approved",
      title: merchantStats?.approvedKYCMerchant,
      // persent: "KYC Approved",       
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Stripe Account Active",
      title: merchantStats?.activeStripeMerchant,
      // persent: "Stripe Accounts Active ",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "Stripe account inactive",
      title: merchantStats?.inActiveStripeMerchant,
      // persent: "Stripe Accounts inactive",
      icon: cart,
      bnb: "bnb2",
    },
  ];



  const columns = [
    {
      className: "merchant-table-divs",
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (item, storeDetail) => <div>{item} {storeDetail?.lastName}</div>,
      // console.log("eqweq",storeDetail)
    },

    {
      className: "merchant-table-divs",
      title: "Individual",
      key: "isIndividual",
      dataIndex: "isIndividual",
      render: (item) => (
        <div>{item ? <p>freelancer</p> : <p>store owner</p>}</div>
      ),
    },

    // {
    //   className: "merchant-table-divs kyc-tag-div",
    //   title: "KYC",
    //   key: "isKycFormApproved",
    //   dataIndex: "isKycFormApproved",
    //   render: (item) => (
    //     <div>
    //       {item ? (
    //         <Tag className="active">approved</Tag>
    //       ) : (
    //         <Tag className="inactive">not approved</Tag>
    //       )}
    //       {item}
    //     </div>
    //   ),
    // },

    {
      className: "merchant-table-divs active-tag-div",
      title: "KYC Status",
      key: "isKYCApproved",
      dataIndex: "isKYCApproved",
      render: (item, data) =>

        <div>
          {data?.isKYCApproved === "APPROVED" ? (
            <Tag className="active">Approved</Tag>
          ) : (
            <Tag className="inactive">Rejected</Tag>
          )}
        </div>

    },

    {
      className: "merchant-table-divs stripe-tag-div",
      title: "Stripe Account",
      key: "isStripeAccountVerified",
      dataIndex: "isStripeAccountVerified",
      render: (item) => (
        <div>
          {item ? (
            <Tag className="active">Active</Tag>
          ) : (
            <Tag className="inactive">Not Active</Tag>
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (id) => <Button type="link" className="detail-btn" onClick={() => { Router.push({ pathname: `/admin/merchant/merchant-detail/${id}` }) }}>Details</Button>

    },
  ];

  const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #276778;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #276778;
  }
`;

  const handleChange = (value) => {
    console.log(`selected ${value}`);

  };

  return (

    <>
      {/* {loading ? <Loader /> : <div className="layout-content">

        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
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

      </div>} */}

      <div className="layout-content merchant-top-4-divs">

        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >

              <Card bordered={false} className="criclebox ">
                {loading ? <Loader /> : <div className="number">
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
                </div>}

              </Card>
            </Col>
          ))}
        </Row>

      </div>



      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <div className="ant-merchant">
              <TableCard

                title={
                  <>

                  <div className="total-merchants-div">

                  <h3>{loading ? "Merchants" : "Merchants" }</h3>
                  <p>Total Merchants : {totalMerchants.length}</p>

                  </div>

                  </>
                }

        


                extra={

                  <>



                    {/* <span>Sort by</span> */}


                    <div className="filter-all-dropdown-div">

                      <Select

                        defaultValue="All"
                        style={{
                          width: 130,
                        }}
                        enable
                        options={[
                          {
                            value: "approved",
                            label: "Approved",
                          },
                          {
                            value: "pending",
                            label: "Pending",
                          },
                          {
                            value: "all",
                            label: "All",
                          },
                        ]}

                      />

                      {/* <Space direction="vertical">
                        <Search
                          placeholder="input search text"
                          // onSearch={onSearch}
                          style={{
                            width: 200,
                          }}
                        />

                      </Space> */}

                      {/* <div><Button className="filter-button" onClick={showDrawer}>Filter</Button></div> */}

                    </div>



                    




                    {/* <img src="../../../assets/images/filter.png"></img> */}

                  </>
                }
              >
                <Drawer
                  className="settings-drawer"
                  mask={true}
                  width={360}
                  onClose={hideDrawer}
                  // placement={placement}
                  visible={visible}
                >
                  <div layout="vertical">
                    <div className="header-top">
                      <Title level={4}>
                        <h4> Filters </h4>
                        <hr></hr>

                        {/* <input type="text" id="bookingId" class="ant-input ant-input-lg" value=""></input> */}

                        {/* <div class="ant-row ant-form-item-row"><div class="ant-col ant-form-item-label"><label for="bookingId" class="" title="Booking Id">Name</label></div><div class="ant-col ant-form-item-control"><div class="ant-form-item-control-input"><div class="ant-form-item-control-input-content">
                          <input type="text" id="bookingId" class="ant-input ant-input-lg" value=""></input></div></div></div></div> */}

                        <DefaultInput
                          name={"Email"}
                          rules={[
                            { required: true, message: "Please enter your valid email!" },
                          ]}
                          label={"Name"}
                          type={"email"}
                          className="name-input"
                        />

                        <Select
                          className="filter-dropbox-1"
                          defaultValue="lucy"
                          style={{
                            width: 320,
                            // height: 50,
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: 'jack',
                              label: 'Jack',
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy',
                            },




                          ]}


                        />

                        <Select
                          className="filter-dropbox-1"
                          defaultValue="lucy"
                          style={{
                            width: 320,
                            // height: 50,
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: 'jack',
                              label: 'Jack',
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy',
                            },




                          ]}


                        />

                        <Select
                          className="filter-dropbox-1"
                          defaultValue="lucy"
                          style={{
                            width: 320,
                            // height: 50,
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: 'jack',
                              label: 'Jack',
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy',
                            },




                          ]}


                        />












                      </Title>
                    </div>

                    <div className="sidebar-color">

                      {/* <Title level={5}>Sidebar Color</Title>
                      <div className="theme-color mb-2">
                        <ButtonContainer>
                          <Button
                            type="primary"
                            onClick={() => handleSidenavColor("#276778")}
                          >
                            1
                          </Button>
                          <Button
                            type="success"
                            onClick={() => handleSidenavColor("#52c41a")}
                          >
                            1
                          </Button>
                          <Button
                            type="danger"
                            onClick={() => handleSidenavColor("#d9363e")}
                          >
                            1
                          </Button>
                          <Button
                            type="yellow"
                            onClick={() => handleSidenavColor("#fadb14")}
                          >
                            1
                          </Button>

                          <Button
                            type="black"
                            onClick={() => handleSidenavColor("#111")}
                          >
                            1
                          </Button>
                        </ButtonContainer>
                      </div> */}

                      {/* <div className="sidebarnav-color mb-2">
                        <Title level={5}>Sidenav Type</Title>
                        <Text>Choose between 2 different sidenav types.</Text>
                        <ButtonContainer className="trans">
                          <Button
                            type={sidenavType === "transparent" ? "primary" : "white"}
                            onClick={() => {
                              handleSidenavType("transparent");
                              setSidenavType("transparent");
                            }}
                          >
                            TRANSPARENT
                          </Button>
                          <Button
                            type={sidenavType === "white" ? "primary" : "white"}
                            onClick={() => {
                              handleSidenavType("#fff");
                              setSidenavType("white");
                            }}
                          >
                            WHITE
                          </Button>
                        </ButtonContainer>
                      </div> */}
                      {/* <div className="fixed-nav mb-2">
                        <Title level={5}>Navbar Fixed </Title>
                        <Switch onChange={(e) => handleFixedNavbar(e)} />
                      </div> */}
                      {/* <div className="ant-docment">
                        <ButtonContainer>
                          <Button type="black" size="large">
                            FREE DOWNLOAD
                          </Button>
                          <Button size="large">VIEW DOCUMENTATION</Button>
                        </ButtonContainer>
                      </div> */}
                      {/* <div className="viewstar">
                        <a href="#pablo">{<StarOutlined />} Star</a>
                        <a href="#pablo"> 190</a>
                      </div> */}

                      {/* <div className="ant-thank">
                        <Title level={5} className="mb-2">
                          Thank you for sharing!
                        </Title>
                        <ButtonContainer className="social">
                          <Button type="black">{<TwitterOutlined />}TWEET</Button>
                          <Button type="black">{<FacebookFilled />}SHARE</Button>
                        </ButtonContainer>
                      </div> */}
                    </div>
                  </div>
                </Drawer>

                <Tabs defaultActiveKey="1">
                  <DynamicTables
                    loading={loading}
                    columns={columns}
                    // onRow={(rowData) => {
                    //   return {
                    //     onClick: () => {
                    //       Router.push({
                    //         pathname: `/admin/merchant/merchant-detail/${rowData?._id}`,
                    //       });
                    //     },
                    //   };
                    // }}
                    data={merchant}
                  />
                </Tabs>

              </TableCard>
            </div>
          </Col>
        </Row>
      </div>

    </>
  );
}

Merchant.layout = Main;