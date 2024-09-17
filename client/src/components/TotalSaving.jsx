import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/totalSavings.css";
const TotalSaving = () => {
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [uid, setUserid] = useState();
  const [mydata, setmydata] = useState([]);
  const [mydata2, setmydata2] = useState([]);
  let sno = 0;
  let sno1 = 0;
  let earningtotal = 0;
  let expensetotal = 0;

  useEffect(() => {
    setUserid(window.localStorage.getItem("userid"));
  }, []);

  const sendReport = async () => {
    const api = "http://localhost:3000/transection/report";

    try {
      let res = await axios.post(api, { startdate, enddate, uid });
      console.log(res);
      setmydata(res.data.earningdata);
      setmydata2(res.data.expensedata);
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

  const EarningData = mydata.map((key) => {
    sno++;
    earningtotal = earningtotal + key.amount;
    return (
      <>
        <tr>
          <td>{sno}</td>
          <td>{key.date}</td>
          <td>{key.source}</td>
          <td>{key.amount}</td>
        </tr>
      </>
    );
  });

  const ExpenseData = mydata2.map((key) => {
    sno1++;
    expensetotal = expensetotal + key.amount;
    return (
      <>
        <tr>
          <td>{sno1}</td>
          <td>{key.date}</td>
          <td>{key.description}</td>
          <td>{key.amount}</td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div className="reportdate">
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {" "}
          Enter Starting Date:
          <Form.Control
            style={{ width: "50%" }}
            type="date"
            name="startdate"
            value={startdate}
            onChange={(e) => setstartdate(e.target.value)}
          />{" "}
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {" "}
          Enter Ending Date:
          <Form.Control
            style={{ width: "50%" }}
            type="date"
            name="enddate"
            value={enddate}
            onChange={(e) => setenddate(e.target.value)}
          />{" "}
        </div>
        <Button
          style={{ padding: "5px 50px" }}
          onClick={sendReport}
          variant="dark"
        >
          Search Data
        </Button>
      </div>
      <hr />
      <div className="reportdata">
        <div>
          <h3>Earning Data</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Date</th>
                <th>Source</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {EarningData}
              <tr>
                <td colSpan="4" align="end">
                  <h4>Total Earning:{earningtotal}</h4>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div>
          <h3>Expense Data</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {ExpenseData}
              <tr>
                <td colSpan="4" align="end">
                  <h4>Total Expense:{expensetotal}</h4>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <h2 align="center">
        Total Saving:{" "}
        {earningtotal - expensetotal < 0 ? (
          <span style={{ color: "red", fontStyle: "verdana" }}>
            {earningtotal - expensetotal}
          </span>
        ) : (
          <span style={{ color: "green", fontStyle: "verdana" }}>
            {earningtotal - expensetotal}
          </span>
        )}
      </h2>
    </>
  );
};

export default TotalSaving;
