//formerly forgetPassword

import React, { useState } from "react";
import Link from "next/link";
import { Layout, Row, Col, Typography, Form, Alert,message } from "antd";
import DefaultInput from "../../components/Input/DefaultInput";
import DefaultButton from "../../components/Button/Button";
import ForgetPasswordAPI from "../../services/ForgetPassword/ForgetPasswordAPI";

const Email = () => {
  const { Title } = Typography;
  const { Content } = Layout;
  const [successAlert, setSuccessAlert] = useState(false);
  const [FailureAlert, setFailureAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const handleClick = () => {
    setIsDisabled(true);
    setTimeRemaining(120)
    setTimeout(() => {
      setIsDisabled(false);
      setTimeRemaining(0);
    }, 120000);

    const interval = setInterval(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 120000);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await ForgetPasswordAPI(values);
      let data = res.data;
      let response = res.response;

      if (response.status === 200) {
        handleClick();
        setLoading(false);
        message.success("Password successfully Changed")
      }
    } catch (error) {
      setLoading(false);
      message.error(error?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // window.alert('Password recovery Failed')
    // console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row justify="space-around">
            <Col className="signIn-main-container" lg={12}>
              <div>
                <Title className="mb-15">Password Lost?</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your Account to recover password
                </Title>
                <div>
                  {successAlert && <Alert message="Success" type="success" />}
                  {FailureAlert && (
                    <Alert message="Attempt Failed" type="error" />
                  )}
                </div>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <DefaultInput
                    name={"email"}
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please input valid email!" },
                    ]}
                    // label={"Email"}
                  />
                  <Col lag={24}>
                    <p className="timeRemaining">{timeRemaining<=0?<></>:`Resend in ${timeRemaining} seconds`}</p>
                    <DefaultButton
                      disabled={isDisabled}
                      htmlType={"submit"}
                      title="Recover Account"
                      className="colored_btn"
                      type="primary"
                      loading={loading ? true : false}
                    />
                  </Col>
                </Form>
              </div>
            </Col>
            <Col className="signIn-main-container" lg={12}>
              <img src="/login.jpg" alt="Hello" className="sideImage"/>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Email;
