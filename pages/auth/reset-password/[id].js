//formerly changePassword

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout, Row, Col, Typography, Form, Alert } from "antd";
import DefaultInput from "../../../components/Input/DefaultInput";
import DefaultButton from "../../../components/Button/Button";
import ChangePasswordAPI from "../../../services/ChangePassword/ChangePasswordAPI";

const ChangePassword = () => {
  const router = useRouter()
  const { id } = router.query
  const { Title } = Typography;
  const { Content } = Layout;
  const [successAlert, setSuccessAlert] = useState(false)
  const [failureAlert, setFailureAlert] = useState(false)
  const [loading, setLoading] = useState(false)




  let token = id
  const onFinish = async (values) => {
    setLoading(true)
    values.token = token
    console.log(values)
    try {
      const res = await ChangePasswordAPI(values);
      let data = res.data
      let response = res.response
      if (response.status === 200) {
        setLoading(false)
        setSuccessAlert(true)
        router.push('admin/signUp')
        setTimeout(() => {
          setSuccessAlert(false)
        }, 3000)

      }
    } catch (error) {
      setLoading(false)
      setFailureAlert(true)
      // console.log(error);


    }


  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row justify="space-around">
            <Col className="signIn-main-container" lg={12}>
              <div>
                <Title className="mb-15">Change Password</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter new password to access your dashboard.
                </Title>
                <div>
                  {failureAlert && <Alert message='Attempt Failed' type="error" />}
                  {successAlert && <Alert message='Success' type="success" />}
                </div>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <DefaultInput
                    name={"password"}
                    rules={[
                      { required: true, message: "Please input a new Password" },
                      {
                        pattern: new RegExp(
                          "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
                        ),
                        message:
                          "One upper case, one lower case , one special character , one number & at least eight character",
                      },
                    ]}
                    label={"New Password"}
                    type={"password"}
                  />

                  <DefaultInput
                    name={"confirmPassword"}
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("Password not match"));
                        },
                      }),
                    ]}
                    label={"Confirm Password"}
                    type={"password"}
                  />


                  <Col lag={24}>
                    <DefaultButton
                      htmlType={"submit"}
                      title="Change Password"
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

export default ChangePassword