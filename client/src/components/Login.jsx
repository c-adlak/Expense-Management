import React from "react";
import "../style/home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Alert } from "antd";
const Login = () => {
  const [loginInfo, SetLoginInfo] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    const api = "http://localhost:3000/user/saveuser";

    try {
      const res = await axios.post(api, input);
      console.log(res.data);
      alert("data saved");
      setInput({
        name: "",
        city: "",
        email: "",
        password: "",
      });
      setShow(false);
    } catch (error) {
      // Check if the error response exists
      if (error.response) {
        // Handle known error responses
        if (error.response.data.message) {
          alert(error.response.data.message); // Display specific error message
        } else {
          alert("An error occurred: " + error.message); // Fallback error message
        }
      } else {
        // Handle network or unexpected errors
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleLofinForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    SetLoginInfo((values) => ({ ...values, [name]: value }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const api = "http://localhost:3000/user/userlogin";

    try {
      const res = await axios.post(api, loginInfo);
      // Handle success
      //  <Alert message="res.data.message" type="success" showIcon />;
      alert(res.data.message); // Show success message (e.g., "Login successful")
      window.localStorage.setItem("username", res.data.user.name);
      window.localStorage.setItem("useremail", res.data.user.email);
      window.localStorage.setItem("userid", res.data.user._id);
      navigate("/dashboard");
    } catch (error) {
      // Check if the error response exists
      if (error.response) {
        // Handle known error responses
        if (error.response.data.message) {
          alert(error.response.data.message); // Display specific error message
        } else {
          alert("An error occurred: " + error.message); // Fallback error message
        }
      } else {
        // Handle network or unexpected errors
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {/* nav bar for login page  */}
      <nav>
        <div></div>
        <div>
          <h3>Manage Your Expense</h3>
        </div>

        <div>
          <button className="reg-btn" variant="success" onClick={handleShow}>
            Register
          </button>
        </div>
      </nav>
      {/* ------------------------------------ */}
      {/* login form */}
      <div className="form-container">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleLofinForm}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleLofinForm}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleLoginSubmit}>
            Submit
          </Button>
        </Form>
      </div>

      {/* model form for registration */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                autoFocus
                name="name"
                value={input.name}
                onChange={handelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                autoFocus
                name="city"
                value={input.city}
                onChange={handelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email"
                value={input.email}
                onChange={handelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter password"
                autoFocus
                name="password"
                value={input.password}
                onChange={handelChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Data
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
