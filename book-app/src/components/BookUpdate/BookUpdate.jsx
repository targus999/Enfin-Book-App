import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBookModal = ({ book, close }) => {
  const [formData, setFormData] = useState({
    name: book.name,
    description: book.description,
    publishDate: book.date,
    price: book.price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClose = () => {close();};

  const handleSubmit = async() => {
    try {
        const res = await axios.put(`http://localhost:8080/books/${book._id}`,formData);
      } catch (error) {
        // Handle errors here
        console.error("Error:", error.message);
      }
    console.log(formData);
    close();
    window.location.href = '/list';
  };

  return (
    <Modal show={true} >
      <Modal.Header >
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPublishDate">
            <Form.Label>Publish Date</Form.Label>
            <Form.Control
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBookModal;
