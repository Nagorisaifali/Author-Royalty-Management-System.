
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Withdrawals({ authorId }) {
  const [amount, setAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState("");

  const load = () => {
    api.get(`/authors/${authorId}/withdrawals`)
      .then(res => setWithdrawals(res.data));
  };

  useEffect(load, [authorId]);

  const submit = async () => {
    try {
      setError("");
      await api.post("/withdrawals", {
        author_id: authorId,
        amount: Number(amount),
      });
      setAmount("");
      load();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <h3>Withdrawals</h3>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={submit}>Withdraw</button>

      {error && <p className="error">{error}</p>}

      <ul>
        {withdrawals.map(w => (
          <li key={w.id}>
            ₹{w.amount} — {w.status} — {new Date(w.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </>
  );
}
