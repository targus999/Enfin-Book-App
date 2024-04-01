import React, { useState } from "react";
import axios from "axios";
import "./BookForm.css";
import { Form, Button } from "react-bootstrap";

const BookForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    publishDate: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((value) => value === "");
    if (!isEmpty) {
      try {
        const res = await axios.post("http://localhost:8080/books", formData);
        window.location.href = "/list";
      } catch (error) {
        // Handle errors here
        console.error("Error:", error.message);
      }
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="formName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formDescription">
          <Form.Label className="form-label">Description</Form.Label>
          <Form.Control
            className="form-control form-textarea"
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formPublishDate">
          <Form.Label className="form-label">Publish Date</Form.Label>
          <Form.Control
            className="form-control"
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formPrice">
          <Form.Label className="form-label">Price</Form.Label>
          <Form.Control
            className="form-control"
            type="number"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="submit-button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
