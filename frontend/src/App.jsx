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
    <tr key={i}>
      <td>{i + 1}</td> <td>{b.title}</td>{" "}
      <td style={{ color: "white" }}>{b.author}</td>
      <td style={{ color: "white", fontSize: "12px", fontWeight: "900" }}>
        {b.publication_year}
      </td>
    </tr>
  ));
  console.log(books);
  return (
    <>
      <h1>Books📖:</h1>
      <table className="container">
        {booksElem.length > 0 ? booksElem : "no books available"}
      </table>
    </>
  );
}

export default App;
