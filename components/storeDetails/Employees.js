import Loader from "../Loader"
import Empty from "../Empty";
import CardTitle from "../CardTitle";
import ServiceCard from "../ServiceCard";
import DefaultButton from "../Button/Button"
import Styles from "../../styles/StoreDetails.module.css"
import {
  Row,
  Col,
  Image,
  Card,
} from "antd";
import {
  UploadOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  RiseOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from "@ant-design/icons";



export default function Employees({ employeeList, title }) {
  return (
    <>
      <div className="employees-main-div">
        <Row className="card-container-row">
          <Col span={24}>
            <CardTitle
              title={title}
              // className= "employee-total-header"
              className="tab-header employee-total-header"

            />

          </Col>
          
          {employeeList?.length != 0 ? (
            employeeList?.map((employeeList, index) => {
              console.log("employeeList?.profile?.url", employeeList?.profile?.url)
              return (
                <>


                  {employeeList?.firstName == "Not Assigned" ? null : (
                    <Col key={index} className="employee-card-containe">
                      <Card>
                        <div>
                          <div className="employee-card-header">
                            <div className="employee-image-name">
                              <div>
                                {employeeList?.profile?.url ? (
                                  <>
                                    <Image
                                      src={employeeList?.profile?.url}
                                      alt=""
                                      preview
                                    />
                                    {/* <label
                                for="uploadLogo"
                                className="update_logo_img"
                              >
                                <input
                                  width={'300'}
                                  height={"350"}
                                  type="file"
                                  id="uploadLogo"
                                  hidden
                                  value=""
                                  accept="image/png, image/gif, image/jpeg"
                                  
                                />
                                <UploadOutlined />
                              </label> */}
                                  </>
                                ) : (
                                  <UserOutlined />
                                )}
                              </div>



                              <div className="employee-name-section">
                                <span>{employeeList?.firstName}</span>
                                <span>{employeeList?.lastName}</span>
                                <p>
                                  <select className="specialization-list">
                                    {employeeList?.specialization?.map(
                                      (item, index) => {
                                        return (
                                          <>
                                            <option value={index}>
                                              {item?.title}
                                            </option>
                                          </>
                                        );
                                      }
                                    )}
                                  </select>
                                </p>
                              </div>
                            </div>

                            {/* <div className="employee-edit-section">
                              <img src={employeeList?.profile?.url}  />
                              <img src={employeeList?.profile?.url}  />
                            </div> */}
                          </div>



                          <div>
                            <li className="employee-card-list">
                              <MailOutlined /> {employeeList?.email}
                            </li>
                            <li className="employee-card-list">
                              <RetweetOutlined />{" "}
                              {employeeList?.isActive ? "Active" : "Inactive"}
                            </li>
                            <li className="employee-card-list">
                              <PhoneOutlined rotate={100} />
                              {employeeList?.phoneNo != "undefined" &&
                                employeeList?.phoneNo != ""
                                ? `+${" "}${employeeList?.phoneNo}`
                                : "N/A"}
                            </li>
                            <li className="employee-card-list">
                              <UserOutlined /> {employeeList?.gender}{" "}
                            </li>
                            <li className="employee-card-list">
                              <RiseOutlined />{" "}
                              {employeeList?.age != "undefined" &&
                                employeeList?.age != ""
                                ? `${employeeList?.age} year`
                                : "N/A"}
                            </li>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })
          ) : (
            <Col span={24}>
              <Empty description="No Employee Available" />
            </Col>
          )}
        </Row>

      </div>

    </>

  )
}