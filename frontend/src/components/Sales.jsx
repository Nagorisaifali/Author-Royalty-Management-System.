
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Sales({ authorId }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get(`/authors/${authorId}/sales`)
      .then(res => setSales(res.data));
  }, [authorId]);

  return (
    <>
      <h3>Sales</h3>
      <ul>
        {sales.map((s, i) => (
          <li key={i}>
            {s.sale_date} — {s.book_title} — {s.quantity} copies — ₹{s.royalty_earned}
          </li>
        ))}
      </ul>
    </>
  );
}
