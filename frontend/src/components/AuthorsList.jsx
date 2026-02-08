
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AuthorsList({ setAuthorId }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    api.get("/authors").then(res => setAuthors(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Authors</h2>
      {authors.map(a => (
        <div
          key={a.id}
          className="list-item"
          onClick={() => setAuthorId(a.id)}
        >
          <strong>{a.name}</strong>
          <span>₹{a.current_balance}</span>
        </div>
      ))}
    </div>
  );
}
