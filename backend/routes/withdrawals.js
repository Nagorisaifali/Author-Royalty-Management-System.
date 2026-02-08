
const express = require("express");
const router = express.Router();
const { authors, withdrawals } = require("../data/seed");
const { books, sales } = require("../data/seed");

const calculateBalance = (authorId) => {
  let earned = 0;
  books.filter(b => b.authorId === authorId).forEach(book => {
    sales.filter(s => s.bookId === book.id)
      .forEach(s => earned += s.qty * book.royalty);
  });

  let withdrawn = withdrawals
    .filter(w => w.authorId === authorId)
    .reduce((a, b) => a + b.amount, 0);

  return earned - withdrawn;
};

router.post("/", (req, res) => {
  const { author_id, amount } = req.body;
  const author = authors.find(a => a.id === author_id);

  if (!author) return res.status(404).json({ error: "Author not found" });
  if (amount < 500) return res.status(400).json({ error: "Minimum withdrawal is ₹500" });

  const balance = calculateBalance(author_id);
  if (amount > balance) return res.status(400).json({ error: "Insufficient balance" });

  const withdrawal = {
    id: withdrawals.length + 1,
    authorId: author_id,
    amount,
    status: "pending",
    createdAt: new Date()
  };

  withdrawals.push(withdrawal);
  res.status(201).json({ ...withdrawal, new_balance: balance - amount });
});

module.exports = router;
