import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default function Alldata() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('https://server-o7vj.onrender.com/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  function handleDelete(index) {
    let DeleteArray = [...data];
    axios.delete(`https://server-o7vj.onrender.com/delete/${DeleteArray[index]._id}`)
      .then(() => {
        alert(`Account ${DeleteArray[index].id} Deleted from Database`);
        DeleteArray.splice(index, 1);
        setData(DeleteArray);
      })
      .catch(error => {
        console.error('Error deleting account:', error);
      });
  }

  return (
    <>
      <h2>Bank Users Database</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AccountNo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Delete-Option</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.amount}</td>
              <td><Button onClick={() => handleDelete(index)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
