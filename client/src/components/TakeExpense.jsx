import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../style/takeEarning.css";

const TakeExpense = () => {
  const [input, setInput] = useState({
    amount: "",
    source: "",
    date: "",
  });
  const [errors, setErrors] = useState({}); // State for validation errors
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(window.localStorage.getItem("userid"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors = {};
    if (!input.amount) newErrors.amount = "Amount is required.";
    if (!input.source) newErrors.source = "Source is required.";
    if (!input.date) newErrors.date = "Date is required.";
    return newErrors;
  };

  const submitData = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
    } else {
      const api = "http://localhost:3000/transection/saveExpense";
      try {
        axios.post(api, { ...input, userid: userId });
        console.log(input);
        // Perform additional actions like sending data to the server
        alert("Data submitted successfully!");
        // Clear form after submission (optional)
        setInput({ amount: "", source: "", date: "" });
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
    }
  };

  return (
    <div>
      <div className="form-container">
        <Form onSubmit={submitData}>
          <Form.Group className="mb-3" controlId="formBasicAmount">
            <Form.Label>Enter Expense</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Enter amount"
              name="amount"
              value={input.amount}
              onChange={handleChange}
            />
            {errors.amount && (
              <span className="text-danger">{errors.amount}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="formBasicSource">
            <Form.Label>Select source of expense</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="source"
              required
              value={input.source}
              onChange={handleChange}
            >
              <option value="">Open this select menu</option>
              <option value="Salary">By Salary</option>
              <option value="Rent">By Rent</option>
              <option value="Interest">By Interest</option>
              <option value="Other">Other Source</option>
            </Form.Select>
            {errors.source && (
              <span className="text-danger">{errors.source}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date of expense</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={input.date}
              onChange={handleChange}
            />
            {errors.date && <span className="text-danger">{errors.date}</span>}
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TakeExpense;
