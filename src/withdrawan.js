import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Withdraw() {
  const [withdraw, setWithdraw] = useState(0);
  const [userId, setUserId] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-o7vj.onrender.com/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  function handleClick(e) {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(userId)) {
        if (data[i].amount >= withdraw) {
          data[i].amount -= Number(withdraw);
          const updateData = { amount: data[i].amount };
          const url = `https://server-o7vj.onrender.com/update/${data[i]._id}`;
          axios.put(url, updateData)
            .then(() => {
              alert(`Rs.${withdraw} Amount Withdrawn from Your Account`);
            })
            .catch(error => {
              console.error('Error updating account:', error);
            });
        } else {
          alert("Your account balance is insufficient for this withdrawal.");
        }
        break; // Stop the loop once the user is found and updated
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleClick}>
        <h4>Withdraw Your Amount Here</h4>
        <hr />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="label">Account No:</Form.Label>
          <Form.Control type="number" id="input" onChange={(e) => { setUserId(e.target.value) }} />
          <Form.Label id="label">Withdraw Amount:</Form.Label>
          <Form.Control type="number" id="input" onChange={(e) => { setWithdraw(e.target.value) }} />
          <Button type="submit" id="submitbtn" variant="danger">Submit</Button>
          <Button type="reset" id="resetbtn" variant="primary">Reset</Button>
        </Form.Group>
      </Form>
    </>
  );
}
