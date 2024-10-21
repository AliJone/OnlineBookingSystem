// import ReactApexChart from "react-apexcharts";
import {
  Card,
  Col,
  Row,
  Typography,
  Spin,
  Form,
  DatePicker,
  Select,
} from "antd";
import { RightOutlined, MinusOutlined, LeftOutlined, LoadingOutlined, ToTopOutlined, MenuUnfoldOutlined, SortAscendingOutlined, } from "@ant-design/icons";
// import lineChart from "./configs/lineChart";

import Loader from "../Loader";
import dynamic from "next/dynamic";
import moment from "moment/moment";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function LineChart(props,) {
  console.log("meme", props.Graph);
  const { Title, Paragraph } = Typography;
  const lineChart = {
    series: [
      {
        name: "Merchants",
        data: props?.Graph?.customerCount,
        offsetY: 0,
      },
      {
        name: "Customers",
        data: props?.Graph?.merchantCount,
        offsetY: 0,
      },
    ],

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: props?.Graph?.labels,
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Merchants and Users</Title>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Merchant</li>
            <li>{<MinusOutlined />} Customer</li>
          </ul>
        </div>
      </div>
      <Col xs={12} lg={12} className="">
          <LeftOutlined
            onClick={() => {
              props.setBookingDate(
                moment(props?.bookingDate).subtract(7, "days")
              );
            }}
          />
          <DatePicker
            defaultValue={moment(new Date(), "YYYY-MM-DD")}
            placeholder=""
            onSelect={(item) => props.setBookingDate(item)}
            showToday={true}
            value={moment(props?.bookingDate)}
          />
          <RightOutlined
            onClick={() => {
              props.setBookingDate(moment(props?.bookingDate).day(7));
            }}
          />
          <Select
            defaultValue="weekly"
            onChange={(value) => {
              props.setCriteria(value);
              props.getGraphAPI(value);
            }}
            options={[
              {
                value: "weekly",
                label: "Week",
              },
              {
                value: "monthly",
                label: "Month",
              },
            ]}
          />
        </Col>

      {props.graphLoading ? (
        // <Spin indicator={antIcon} />
        <Loader/>
      ) : (
        <ReactApexChart
          className="full-width"
          options={lineChart.options}
          series={lineChart.series}
          type="area"
          height={350}
          width={"100%"}
        />
      )}
    </>
  );
}

export default LineChart;
