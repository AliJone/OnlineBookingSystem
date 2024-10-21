// import React from "react";
import Main from "../../../components/layout/Main";
import styles from "../../../styles/Home.module.css";
import DynamicTables from "../../../components/DynamicTables";
import * as customerApi from "../../../services/services/api/dashboard";
import { React, useState, useEffect } from "react";
import Loader from "../../../components/Loader"
import TableCard from "../../../components/TableCard";

import { Select, Alert, Row, Col, Tabs, Tag, Button } from "antd";

import Router from "next/router";

export default function Customers() {
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const [customer, setCustomer] = useState([]);

  const [loading, setLoading] = useState(true);

  const [totalCustomers, setTotalCustomers] = useState(0)

  const fetchAllCustomers = async () => {
    try {
      let { data, response } = await customerApi.allCustomers();
      if (response) {
        setCustomer(data.data);
        setTotalCustomers(data.data)
        // console.log(response.status)
        console.log("---data hai", data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in fetching Customers ", error);
    }
  };


  const emailFilter = async (event) => {
    console.log("sssssssss", event.target.value)
    try {
      let { data, response } = await customerApi.customerFilter();


    } catch (error) {

    }
  }


  console.log("Clients", customer);

  // table code start

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      // width: "32%",
      render: (item, data) => (
        <div>
          {item} {data.lastName}
        </div>
      ),
    },


    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (item) => <div>{item}</div>
    },

    {
      title: "Email Status",
      key: "isEmailVerified",
      dataIndex: "isEmailVerified",
      render: (item) => (
        <div>
          {item ? (
            <Alert className="customer-index-email-verified" message="Verified" type="success" />
          ) : (
            <Alert className="customer-index-email-not-verified" message="Not Verified" type="warning" />
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (data) => <Button type="link" className="detail-btn-customer" onClick={() => { Router.push({ pathname: `/admin/customers/customer-detail/${data}` }) }}   > Details </Button>

    },
  ];



  console.log("customer", customer);

  return (

    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>


          <div className="customer-data" >
            <TableCard

              title={
                <>

                <div className="total-merchants-div">

                <h3>{loading ? "Customers" : "Customers" }</h3>
                <p>Total Customers : {totalCustomers.length}</p>

                </div>
                
                </>
                }

                

              extra={
                <>
                  <div>

                    <Select className="email-verified-dropdown"
                      // onClick={(value)=> emailFilter(value)}
                      // onClick={(s)=>console.log("this is value", s)}


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

              <div className="table-responsive customer-loader">
                <Tabs defaultActiveKey="1">
                  <DynamicTables
                  loading={loading}
                  columns={columns}
                  data={customer}
                />
                </Tabs>
              </div>
            </TableCard>
          </div>
        </Col>
      </Row>
    </div>
  );
}

Customers.layout = Main;
