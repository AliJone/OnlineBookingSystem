import React, { useContext } from "react";
import Router, { useRouter } from "next/router";
import Main from "../../../../components/layout/Main";
import * as merchantApi from "../../../../services/services/api/dashboard";
import { useState, useEffect } from "react";
import Loader from "../../../../components/Loader";
import { Select, Alert, Card, Tabs, Row, Col, Avatar, Modal, Button, Table, Typography, Tag, Form, Input, message } from "antd";
import Swal from "sweetalert2";
import { AppContext } from "../../../../utils/store";

export default function MerchantDetail() {

  const { TextArea } = Input;
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { state } = useContext(AppContext);

  const [merchantDetail, setMerchantDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const [cancelModal, setCanceleModal] = useState(false);
  const [form] = Form.useForm();
  const [togglekyc, setToggleKyc] = useState("")


  const router = useRouter();
  const { id } = router.query;

  const fetchMerchant = async () => {
    try {
      let {
        data: { data },
        response: { status },
      } = await merchantApi.merchantDetail(id);
      console.log("this is data", data)
      if (status === 200) {
        setMerchantDetail(data);
        setToggleKyc(data?.merchant?.isKYCApproved)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in fetching Merchnats ", error.message);
    }
  };


  console.log("togglekyc  ", togglekyc)
  useEffect(() => {
    if (!router.isReady) return;
    fetchMerchant();
  }, [router.isReady]);
  const project = [

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (item, storeDetail) =>
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={storeDetail?.banner?.url}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{item} </Title>
              <p className="email-p">{storeDetail?.merchant?.email}</p>

            </div>
          </Avatar.Group>{" "}
        </>
    },

    {
      title: "Contact",
      dataIndex: "phoneNo",
      key: "phoneNo",
      render: (item) => <div>+{item}</div>
    },
    // {
    //   title: "Owner",
    //   dataIndex: "merchant",
    //   key: "merchant",
    //   render: (item) => <div>{item?.firstName} {item?.lastName}</div>

    // },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (item) => <div>{item?.slice(0, 20)}</div>
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (item) => <div> {item ? (<Tag className="active">Active</Tag>) : (<Tag className="inActive">Active</Tag>)} </div>
    },
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <Button type="link" className="detail-btn" onClick={() => { Router.push({ pathname: `/admin/stores/${id}` }) }}>Details</Button>
    }


  ];

  async function AcceptStore(BookingStatus) {
    try {
      let random = Math.floor(100000 + Math.random() * 900000);
      let result = await Swal.fire({
        customClass: "delete_item",
        title: `Please match the code given below in order to accept KYC`,
        text: random,
        icon: "warning",
        input: "number",
        inputAttributes: {
          min: 0,
          maxlength: 6,
        },
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value == random) {
              resolve();
            } else if (!value) {
              resolve("Please enter code");
            } else {
              resolve("Invalid Code");
            }
          });
        },
        showCancelButton: true,
        confirmButtonColor: "#4eac56",
        cancelButtonColor: "#5CAC56",
        confirmButtonText: "Accept",
        cancelButtonColor: "#fb5656",
      });
      if (result.isConfirmed) {
        // setLoading(true);
        const KYCData = {
          userId: merchantDetail?.merchant?._id,
          isKYCApproved: "APPROVED"
        };
        let {
          response: { status },
        } = await merchantApi.KYCApproved({ KYCData });
        if (status == 200) {
          setToggleKyc("APPROVED")
          message.success("KYC form is accepted");

        }
        // setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };





  const submit = async (e) => {
    const KYCData = {
      userId: merchantDetail?.merchant?._id,
      isKYCApproved: "REJECTED",
      KYCRejectReason: e?.textArea
    };
    let {
      response: { status },
    } = await merchantApi.KYCReject({ KYCData });
    if (status == 200) {

      setToggleKyc("REJECTED")
      setCanceleModal(false)
      message.success("KYC form is Rejected");
    }

  };
  return (
    <>
      <Modal
        title="Rejecting KYC"
        visible={cancelModal}
        onOk={() => setCanceleModal(false)}
        onCancel={() => setCanceleModal(false)}
        footer={[]}
        width={600}
        className="Popup-Modal"
      >
        <Form form={form} onFinish={submit}>
          <Col span={24}>
            <span className="booking_cancelation_box">
              Are you sure you want to reject it ?
            </span>
            <Form.Item
              name="textArea"
              rules={[
                { required: true, message: "Please input reson for Rejecting" },
              ]}
              label={"Reson For Canceling"}
              className="dashboard_content"
            >
              <TextArea type={"text"} size="large" rows={5} />
            </Form.Item>
          </Col>
          <Form.Item style={{ marginTop: 20, marginBottom: 0 }}>
            <Row style={{ display: "flex", justifyContent: "end" }}>
              <Col span={8}>
                <Button htmlType="submit" type="primary" className="tag-primary reject-submit-btn">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Tabs defaultActiveKey="1" className="kyc-container">
        <TabPane tab="KYC FORM" key="1"> {loading ? <div className="loader-container"> <Loader /> </div> :
          <div>

            <div className="merchant-kyc-popup">
              {togglekyc === "APPROVED" ? <Alert className="alert-approve-class" message="Merchant's KYC is Approved" type="success" />
                : togglekyc === "PENDING" ? <Alert className="alert-pending-class" type="info" message="KYC of this Merchant is Pending" />
                  : <Alert className="alert-not-class" message="Merchant's KYC is Not Approved" type="warning" />}
            </div>

            <Card
              className="merchant-head-profile"
              bodyStyle={{ display: "none" }}
              title={
                <Row justify="space-between" align="middle" gutter={[24, 0]}>
                  <Col span={24} md={12} className="col-info">
                    <Avatar.Group>
                      <Avatar size={74} shape="square" src={"tree.jpeg"} />

                      <div className="avatar-info">
                        <h4 className="font-semibold m-0">
                          {merchantDetail?.merchant?.firstName} {merchantDetail?.merchant?.lastName}
                        </h4>
                        <p>{merchantDetail?.merchant?.isIndividual ? "Freelancer" : "Store Owner"}</p>
                      </div>
                    </Avatar.Group>
                  </Col>

                  {togglekyc == "APPROVED" ?

                    <Col

                      span={24}
                      md={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >


                      <Button onClick={() => setCanceleModal(true)} danger type="primary" className="tag-danger profile-btn-2">
                        Reject
                      </Button>


                    </Col>

                    : togglekyc === "REJECTED" ? <Col

                      span={24}
                      md={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button onClick={() => AcceptStore()} type="primary" className="tag-primary profile-btn-1">
                        Approve
                      </Button>


                    </Col>

                      : <Col

                        span={24}
                        md={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >


                        <Button onClick={() => AcceptStore()} type="primary" className="tag-primary profile-btn-1">
                          Approve
                        </Button>
                        <Button onClick={() => setCanceleModal(true)} danger type="primary" className="tag-danger profile-btn-2">
                          Reject
                        </Button>
                      </Col>}

                </Row>
              }
            ></Card>
            {/* {merchantDetail?.merchant?.isKYCApproved ===  "APPROVED"? <Alert className="alert-approve-class" message="Merchant's KYC is Approved" type="success" /> : merchantDetail?.merchant?.isKYCApproved === "PENDING"   ?  <Alert className="alert-pending-class" type="info" message="KYC of this Merchant is Pending"  /> :  <Alert className="alert-not-class" message="Merchant's KYC is Not Approved" type="warning"/>} */}
            <Card
              bordered={false}
              className="header-solid h-full"
              title={<h6 className="font-semibold m-0 header-information">Personal Information</h6>}

            >

              <Row>


                <Col lg={8} sm={24}>




                  <Col className="information-container">
                    <h4>Phone No : &nbsp;</h4>
                    <p> {merchantDetail?.merchant?.phoneNo}</p>
                  </Col>
                  <Col className="information-container">
                    <h4>Email : &nbsp;</h4>
                    <p> {merchantDetail?.merchant?.email}</p>
                  </Col>

                  <Col className="information-container">
                    <h4>Country : &nbsp;</h4>
                    <p>{merchantDetail?.merchant?.country}</p>
                  </Col>



                </Col>


                <Col lg={8} sm={24}>





                  <Col className="information-container">
                    <h4>Street : &nbsp;</h4>
                    <p>N/A</p>
                  </Col>

                  <Col className="information-container">
                    <h4>City : &nbsp;</h4>
                    <p>Samao City</p>
                  </Col>

                  <Col className="information-container">
                    <h4>State : &nbsp;</h4>
                    <p>{merchantDetail?.merchant?.state}</p>
                  </Col>
                </Col>

                <Col lg={8} sm={24}>



                  <Col className="information-container">
                    <h4>Website Url : &nbsp;</h4>
                    <p>www.smokeshowsstudios.com</p>
                  </Col>

                  <Col className="information-container">
                    <h4>ZipCode : &nbsp;</h4>
                    <p>55124</p>
                  </Col>



                </Col>
              </Row>

            </Card>

            <Row gutter={[12, 0]}>

              <Col lg={12} md={8} className="mb-24">
                <Card
                  bordered={false}
                  title={<h6 className="font-semibold m-0 header-information">Merchant Information</h6>}
                  className="header-solid h-full card-profile-information"
                  bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                >

                  <Col className="information-container">
                    <h4>Merchant Name : &nbsp;</h4>
                    <p>Smoke Show Studios</p>
                  </Col>


                  <Col className="information-container">
                    <h4>Merchant Email : &nbsp;</h4>
                    <p>{merchantDetail?.merchant?.email}</p>
                  </Col>

                  <Col className="information-container">

                    <h4>Merchant No : &nbsp;</h4>
                    <p>N/A</p>
                  </Col>

                  <Col className="information-container">
                    <h4>Merchant Address : &nbsp;</h4>
                    <p>N/A</p>
                  </Col>

                </Card>
              </Col>

              <Col lg={12} md={8} className="mb-24">
                <Card
                  bordered={false}
                  title={<h6 className="font-semibold m-0 header-information">Bank Information</h6>}
                  className="header-solid h-full"
                  bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                >
                  <Col className="information-container">
                    <h4>Bank Name : &nbsp;</h4>
                    <p>{merchantDetail?.bankInfo?.bankName}</p>
                  </Col>

                  <Col className="information-container">
                    <h4>Account Title : &nbsp;</h4>
                    <p>{merchantDetail?.bankInfo?.accountTitle}</p>
                  </Col>

                  <Col className="information-container">
                    <h4>Account Number : &nbsp;</h4>
                    <p>************</p>
                  </Col>

                  <Col className="information-container">
                    <h4>Route / Sort Code  : &nbsp;</h4>
                    <p>************</p>
                  </Col>

                  <Col className="information-container">
                    <h4>Branch Address  : &nbsp;</h4>
                    <p>{merchantDetail?.bankInfo?.branchAddress}</p>
                  </Col>
                </Card>
              </Col>
            </Row>


          </div>



        }  </TabPane>


        <TabPane tab="STORES" key="2" className="story">

          <Card
            className="merchant-head-profile"
            bodyStyle={{ display: "none" }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]}>
                <Col span={24} md={12} className="col-info">
                  <Avatar.Group>
                    <Avatar size={74} shape="square" src={""} />

                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">
                        {merchantDetail?.merchant?.firstName} {merchantDetail?.merchant?.lastName}
                      </h4>
                      <p>{merchantDetail?.merchant?.isIndividual ? "Freelancer" : "Store Owner"}</p>
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

                </Col>
              </Row>
            }
          ></Card>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title={ 
              <>
              <div>
              {loading ? "Stores : 0" : "Stores"}  
              </div>

              {/* <p> {loading ? "Total Stores : 0" : `Total Stores ${merchantDetail.stores?.totalDocs?.length} `}</p> */}
              <p> {loading ? "Total Stores : 0" : `Total Stores ${merchantDetail?.stores?.totalDocs} `}</p>


              </>
            
            } 
            extra={
              <>

                <div>

                  <Select className="email-verified-dropdown"


                    defaultValue="All"
                    style={{
                      width: 130,
                    }}
                    enable
                    options={[
                      {
                        value: "all",
                        label: "All",
                      },
                      {
                        value: true,
                        label: "Email Verified",
                      },
                      {
                        value: false,
                        label: "Email Not Verified",
                      },

                    ]}
                  ></Select>
                </div>

              </>
            }
          >
            <div className="table-responsive">
              <Table
                columns={project}
                dataSource={merchantDetail?.stores?.docs}
                pagination={false}
                loading={loading}
                className="ant-border-space"
              />
            </div>

          </Card>
        </TabPane>
      </Tabs>

    </>
  );
}

MerchantDetail.layout = Main;

