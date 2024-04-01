import axios from "axios";
import React, { useState } from "react";
import moment from 'moment';
import { Card, Button } from "react-bootstrap";
import  BookUpdate from "../BookUpdate/BookUpdate"

const BookCard = ({ book }) => {
  const { _id, name, description, price, date } = book;
  const formattedDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
  const [show, setShow] = useState(false);

  function onUpdate(id) {setShow(true)}
  function handleClose() {setShow(false)}
  
  async function onDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:8080/books/${id}`);
      window.location.href = '/list';
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message);
    }
  }

  return (
    <>
    {show?<BookUpdate book={book} close={handleClose}></BookUpdate>:''}
      <Card style={{ width: "18rem" }} className="mb-3">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Price: ₹{price}</Card.Text>
          <Card.Text>Publish Date:{formattedDate}</Card.Text>
          <Button
            className="m-4"
            variant="primary"
            onClick={() => onUpdate(_id)}
          >
            Update
          </Button>
          <Button
            className="m-4"
            variant="danger"
            onClick={() => onDelete(_id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookCard;
