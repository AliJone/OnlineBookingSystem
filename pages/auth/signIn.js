import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { Layout, Row, Col, Typography, Form, Alert,Button, message } from "antd";
import DefaultInput from "../../components/Input/DefaultInput";
import DefaultButton from "../../components/Button/Button";
import SignInAPI from "../../services/SignIn/SignInAPI";
import { useRouter } from "next/router";
import { AppContext } from "../../utils/store";
const SignIn = () => {
  const { Title } = Typography;
  const { dispatch } = useContext(AppContext);
  const { Content } = Layout;
  const [successAlert, setSuccessAlert] = useState(false);
  const [FailureAlert, setFailureAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const router=useRouter()


  const onFinish = async (values) => {
    setLoading(true);
    // console.log(values);
    try {
      const res = await SignInAPI({values});
      let data = res.data;
      let response = res.response;
      // console.log(res);
      console.log(data);
      if (response.status === 200) {
        dispatch({ type: "USER_LOGIN", payload: data });
        Cookies.set('token', data.token);
        
        message.success("Successfully Signed In")
        setLoading(false);
        // setSuccessAlert(false);
        router.push('admin/dashboard')



      }
    } catch (error) {
      setLoading(false);
      message.error(error?.response?.data?.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row justify="space-around">
            <Col className="signIn-main-container" lg={12}>
              <div>
                <Title className="mb-15">Sign in to Book Better</Title>
                <Title className="font-regular text-muted" level={5}>
                  Just enter your credentials to enter and build your dashboard.
                </Title>
                <div>
                  {successAlert && <Alert message="Success" type="success" />}
                  {FailureAlert && (<Alert message="Incorrect Credentials" type="error" />)}
                </div>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col-6"
                >
                  <DefaultInput
                    name={"email"}
                    rules={[
                      { required: true, message: "Please enter your valid email!" },
                      {type: "email", message: "Please enter your valid email!"}
                    ]}
                    label={"Email"}
                    type={"email"}
                  />

                  <DefaultInput
                    name={"password"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password",
                      },
                    ]}
                    label={"Password"}
                    type={"password"}
                  />

                  <Col lg={24} className="forget-container">
                    <Link href="email">
                      <span>Forget Password?</span>
                    </Link>
                  </Col>

                  <Col lag={24}>
                  <Button
                      htmlType={"submit"}
                      className="colored_btn"
                      type="primary"
                      loading={loading ? true : false}
                    >
                      {loading ? '    ' : "Login"}
                  </Button>
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

export default SignIn;
