import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import './BookList.css'; // Import CSS file for styling

const BookList = () => {
  const [bookData, setBookData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/books");
      setBookData(res.data);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="book-list-container"> {/* Add class for styling */}
      <h1>Book List</h1>
      <div className="book-cards-container"> {/* Add class for flexbox */}
        {bookData.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
