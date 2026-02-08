
import { useEffect, useState } from "react";
import { api } from "../api/api";
import Sales from "./Sales";
import Withdrawals from "./Withdrawals";

export default function AuthorDetails({ authorId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    api.get(`/authors/${authorId}`).then(res => setAuthor(res.data));
  }, [authorId]);

  if (!author) return null;

  return (
    <div className="card">
      <h2>{author.name}</h2>
      <p>Email: {author.email}</p>
      <p>Total Earnings: ₹{author.total_earnings}</p>
      <p><b>Current Balance: ₹{author.current_balance}</b></p>

      <h3>Books</h3>
      <ul>
        {author.books.map(b => (
          <li key={b.id}>
            {b.title} — {b.total_sold} sold — ₹{b.total_royalty}
          </li>
        ))}
      </ul>

      <Sales authorId={authorId} />
      <Withdrawals authorId={authorId} refresh={setAuthor} />
    </div>
  );
}
