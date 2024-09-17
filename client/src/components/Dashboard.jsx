import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/dashboard.css";
import Nav from "react-bootstrap/Nav";
const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("username")) {
      navigate("/");
    } else {
      setUserData({
        userName: window.localStorage.getItem("username"),
        userEmail: window.localStorage.getItem("useremail"),
      });
    }
  }, []);
  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty or null strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <Container fluid className="parent-container">
        <Row className="first-row">
          <Col className="nav-bar  ">
            <h3>Welcome: {capitalizeFirstLetter(userData.userName)}</h3>
          </Col>
        </Row>
        <Row className="second-row">
          <Col md={3} className="menu-container h-100 ">
            <MenuControls />
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </Col>
          <Col md={9} className="data-container h-100">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

function MenuControls() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column menu-list">
      <Nav.Link className="list-item" as={Link} to="takeearning">
        Enter Earnings
      </Nav.Link>
      <Nav.Link className="list-item" as={Link} to="takeexpense">
        Enter Expenses
      </Nav.Link>
      <Nav.Link className="list-item" as={Link} to="yourearnings">
        Your Earnings
      </Nav.Link>
      <Nav.Link className="list-item" as={Link} to="yourExpenses">
        Your Expenses
      </Nav.Link>
      <Nav.Link className="list-item" as={Link} to="totalSavings">
        Total Saving
      </Nav.Link>
      <Nav.Link className="list-item" as={Link} to="graph">
        Graphical Representation
      </Nav.Link>
    </Nav>
  );
}
