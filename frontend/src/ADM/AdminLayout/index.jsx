import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Drawer, Dropdown, Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [username, setUsername] = useState("A"); // default to "A"

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user from sessionStorage
  useEffect(() => {
    const userData = localStorage.getItem("user"); // user stored as JSON string
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.name || user.email || "A");
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();// clears all session data
    navigate("/login"); // redirect to login page
  };

  // Profile dropdown menu
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

  // Sidebar menu items
  const items = [
    { key: "/admin/add", icon: <DashboardOutlined />, label: <Link to="/admin/add">Add</Link> },
    { key: "/admin/item", icon: <UnorderedListOutlined />, label: <Link to="/admin/item">Items</Link> },
    { key: "/admin/orders", icon: <ShoppingOutlined />, label: <Link to="/admin/orders">Orders</Link> },
  ];

  const SidebarContent = (
    <div style={{ paddingTop: 100 }}>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={items}
        style={{
          background: "transparent",
          color: "white",
          fontWeight: 500,
        }}
        onClick={() => mobile && setDrawerVisible(false)}
      />
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Mobile Drawer */}
      {mobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{ padding: 0, background: "linear-gradient(180deg, #ff7e5f, #feb47b)" }}
          headerStyle={{ display: "none" }}
        >
          {SidebarContent}
        </Drawer>
      )}

      {/* Desktop Sidebar */}
      {!mobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200}
          style={{
            position: "fixed",
            height: "100vh",
            left: 0,
            top: 0,
            bottom: 0,
            background: "linear-gradient(180deg, #ff7e5f, #feb47b)",
            boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
          }}
        >
          {SidebarContent}
        </Sider>
      )}

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: !mobile ? (collapsed ? 80 : 200) : 0,
          transition: "margin-left 0.2s ease",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: !mobile ? (collapsed ? 80 : 200) : 0,
            right: 0,
            height: 64,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, #ff7e5f, #feb47b)",
            boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
            color: "white",
            transition: "left 0.2s ease",
          }}
        >
          <Button
            type="text"
            icon={
              mobile
                ? drawerVisible
                  ? <MenuFoldOutlined style={{ color: "white" }} />
                  : <MenuUnfoldOutlined style={{ color: "white" }} />
                : collapsed
                ? <MenuUnfoldOutlined style={{ color: "white" }} />
                : <MenuFoldOutlined style={{ color: "white" }} />
            }
            onClick={() =>
              mobile ? setDrawerVisible(!drawerVisible) : setCollapsed(!collapsed)
            }
            style={{ fontSize: "20px" }}
          />
          <h1 style={{ margin: 0, fontSize: 20, color: "white" }}>Admin Panel</h1>

          {/* Profile Dropdown */}
          <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <span style={{ marginRight: 8 }}>{username}</span>
              <Avatar style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </Header>

        {/* Content */}
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

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
            color: "white",
            padding: "12px 50px",
            fontWeight: 500,
          }}
        >
          Food Restaurant ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
