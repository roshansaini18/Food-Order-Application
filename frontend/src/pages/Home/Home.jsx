import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const HIGHLIGHT_COLOR = "#ff946a"; // a soft orange close to your gradient

const UserLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("A");
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.name || user.email || "A");
    }
  }, []);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <span>{username}</span>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      key: "/user/home",
      label: <Link to="/user/home">Home</Link>,
    },
    {
      key: "/user/order",
      icon: <CheckCircleOutlined />,
      label: <Link to="/user/order">Orders</Link>,
    },
    {
      key: "/user/cart",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/user/cart">Cart</Link>,
    },
  ];

  // Custom selected style (similar color as navbar gradient, not blue)
  const menuStyles = {
    background: "transparent",
    color: "white",
    fontWeight: 500,
    flex: 1,
    minWidth: 0,
    borderBottom: "none",
    justifyContent: "flex-end",
    display: "flex",
    gap: "8px",
  };

  const menuItemStyles = ({ key }) =>
    key === pathname
      ? {
          background: HIGHLIGHT_COLOR,
          color: "white",
          borderRadius: 8,
          fontWeight: 600,
        }
      : {};

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 1000,
          padding: "0 24px",
          background: "linear-gradient(180deg, #ff7e5f, #feb47b)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
        }}
      >
        {/* Logo/title navigates to home */}
        <div
          onClick={() => navigate("/user/home")}
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            margin: "auto 0",
            flex: 1,
            cursor: "pointer",
            letterSpacing: 1,
            userSelect: "none",
          }}
        >
          Snackify
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            flex: 2,
            minWidth: 0,
            overflowX: "auto",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname]}
            items={items}
            style={menuStyles}
            // Override default antd blue highlight:
            itemRender={(item) => (
              <div style={menuItemStyles(item)}>{item.label}</div>
            )}
            // The following is a workaround for AntD v5+ which uses token-based override for active item:
            // This works for v4. For v5, include CSS below the export.
          />
          <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: 12,
                color: "white",
              }}
            >
              <Avatar style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>
      </Header>

      <Content
        style={{
          marginTop: 64,
          padding: "24px",
          background: "#f5f7fa",
          minHeight: "calc(100vh - 64px - 60px)",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
          color: "white",
          padding: "12px 50px",
          fontWeight: 500,
        }}
      >
        Snackify ©{new Date().getFullYear()}
      </Footer>

      {/* For Ant Design v5+, override the primary color with custom CSS below */}
      <style>{`
        .ant-menu-dark .ant-menu-item-selected {
          background-color: ${HIGHLIGHT_COLOR} !important;
          color: #fff !important;
        }
        .ant-menu-dark .ant-menu-item-selected a {
          color: #fff !important;
        }
      `}</style>
    </Layout>
  );
};

export default UserLayout;
