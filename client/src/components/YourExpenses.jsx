import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
const YourExpenses = () => {
  const [allEarnings, setAllEarnings] = useState([]);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userid");
    if (storedUserId) {
      setUserid(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const api = "http://localhost:3000/transection/yourExpenses";
      try {
        const res = await axios.post(api, { userid });
        console.log(res.data);
        setAllEarnings(res.data);
        console.log(allEarnings);
      } catch (err) {
        if (err.response) {
          if (err.response.data.message) {
            alert(err.response.data.message);
          } else {
            alert("An error occurred: " + err.message);
          }
        } else {
          // Handle network or unexpected errors
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };

    // Only fetch data if userid is defined
    if (userid) {
      fetchData();
    }
  }, [userid]);
  let sno = 0;
  let expenses = allEarnings.map((key) => {
    sno++;
    return (
      <tr>
        <td>{sno}</td>
        <td>{key.date}</td>
        <td>{key.amount}</td>
        <td>{key.source}</td>
      </tr>
    );
  });

  return (
    <>
      <Table className="mt-4" striped bordered hover>
        <thead>
          <tr>
            <th>S.no</th>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>SOURCE</th>
          </tr>
        </thead>
        <tbody>{expenses}</tbody>
      </Table>
    </>
  );
};

export default YourExpenses;
