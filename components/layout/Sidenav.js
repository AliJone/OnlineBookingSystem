import { Menu, Button } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }) {
  console.log(color);
  const router = useRouter();

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Muse Dashboard</span>
      </div>
      <hr />
    <Menu theme="light" mode="inline" activeKey="1" >
        <Menu.Item key="1" style={{cursor: "pointer"}}>
          <Link href="/admin/dashboard">
            <span
              className="icon"
              style={{
                background: router?.asPath?.includes("dashboard") ? color : "",
                background: color,
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/admin/customers">
            <span
              className="icon"
              style={{
                background: router?.asPath?.includes("dashboard") ? color : "",
                background: color,
              }}
            >
              {dashboard}
            </span>
            <span className="label">Customers</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link href="/admin/merchant">
            <span
              className="icon"
              style={{
                background: router?.asPath?.includes("dashboard") ? color : "",
                background: color,
              }}
            >
              {dashboard}
            </span>
            <span className="label">Merchant</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link href="/admin/stores">
            <span
              className="icon"
              style={{
                background: router?.asPath?.includes("dashboard") ? color : "",
                background: color,
              }}
            >
              {dashboard}
            </span>
            <span className="label">Stores</span>
          </Link>
        </Menu.Item>

      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={
            {
              // background: color,
            }
          }
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;
