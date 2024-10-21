// import React from "react";
import Main from "../../../components/layout/Main";
import styles from "../../../styles/Home.module.css"
import DynamicTables from "../../../components/DynamicTables";
import * as StoreApi from "../../../services/services/api/dashboard";
import { React, useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import EmptyData from "../../../components/EmptyData";
import TableCard from "../../../components/TableCard";

import {
  Row,
  Col,
  Tabs,
  Select,
  Tag,
  Button,
  Avatar,
  Typography,
} from "antd";

const { Title } = Typography;


const { TabPane } = Tabs




import { Router, useRouter } from "next/router";

export default function Stores() {
  let router = useRouter()
  useEffect(() => {
    fetchAllStores()
  }, [])

  const [Store, setStore] = useState([]);
  const [totalStores, setTotalStores] = useState(0);

  const [loading, setLoading] = useState(true);




  const fetchAllStores = async () => {
    try {
      let { data, response } = await StoreApi.allStores()
      if (response) {
        setStore(data.data.docs)
        setTotalStores(data.data)
        // console.log(response.status)
        console.log("this is data",data)
        console.log("this is response data", response)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in fetching Stores ", error.data)
    }
  }


  console.log("stores", Store)


  // table code start

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: "32%",
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
      render: (item) => <div>{item}</div>
    },

    // {
    //   title: "Owner",
    //   key: "",
    //   dataIndex: "",
    //   render: (item, data) => <div>{data.merchant.firstName} {data.merchant.lastName}</div>

    // },

    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (item) => <div>  {item.substring(0, 25)}...</div>

    },
    {
      title: "Status",
      key: "isActive",
      dataIndex: "isActive",
      render: (item) => <div>{item ? <Tag className={styles.tagActive}>Active</Tag> : <Tag className={styles.tagInactive}>InActive</Tag>}</div>

    },

    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (data) => <Button className="store-detail-btn"  type = "link" onClick={()=>{router.push({pathname:`/admin/stores/${data}`})}}>Details</Button>

      // onClick={()=>{router.push({pathname:`/admin/stores/${storeDetail?._id}`})}}
      // console.log("ye data hai",data)
    },
  ];




  return (

    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>

          <div className="store-data" >


        

          <TableCard 
          
          title={ 
            <> 
            <div className="total-merchants-div"> 
            <h3>{loading ? " Stores" :    "Stores"  } </h3>
            <p>Total Stores : {totalStores.totalDocs}</p>
            </div>
            </>
          }
            extra={
              <>
                <Select
                  defaultValue="All"
                  style={{
                    width: 120,
                  }}
                  enable
                  options={[
                    {

                      value: 'approved',
                      label: 'Approved',
                    },
                    {

                      value: 'pending',
                      label: 'Pending',
                    },
                    {

                      value: 'all',
                      label: 'All',
                    },



                  ]}
                />
              </>
            } >
            <div className="table-responsive">

              {loading ?

                <Loader />
                : Store.length !== 0 ?

                  <Tabs defaultActiveKey="1" className="tagAnimate" >
                    <DynamicTables key={(record) => record._id} className="tagAnimate"  columns={columns}  data={Store} onRow={(rowData) => {
              }}/>
                  </Tabs>
                  : <EmptyData description={"No Stores Found"} />
              }
            </div>
          </TableCard>
          </div>

        </Col>
      </Row>
    </div>
  );
}

Stores.layout = Main;
