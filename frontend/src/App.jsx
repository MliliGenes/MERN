import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function getBooks() {
      let res = await fetch("http://localhost:3000/books");
      let data = await res.json();
      return data;
    }
    getBooks().then((data) => setBooks(data));
  }, []);

  let booksElem = books.map((b, i) => (
    <li key={i}>
      {b.title} by <span style={{ color: "gray" }}>{b.author}</span>{" "}
      <span style={{ color: "gray", fontSize: "12px", fontWeight: "900" }}>
        {b.publication_year}
      </span>
    </li>
  ));
  console.log(books);
  return (
    <>
      <ol className="container">
        <h1>Books📖:</h1>{" "}
        {booksElem.length > 0 ? booksElem : "no books available"}
      </ol>
    </>
  );
}

export default App;
