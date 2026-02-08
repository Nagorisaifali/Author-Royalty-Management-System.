
const express = require("express");
const router = express.Router();
const { authors, books, sales, withdrawals } = require("../data/seed");

const calculateEarnings = (authorId) => {
  let total = 0;
  books.filter(b => b.authorId === authorId).forEach(book => {
    sales.filter(s => s.bookId === book.id)
      .forEach(sale => total += sale.qty * book.royalty);
  });
  return total;
};

const currentBalance = (authorId) => {
  const earned = calculateEarnings(authorId);
  const withdrawn = withdrawals
    .filter(w => w.authorId === authorId)
    .reduce((a, b) => a + b.amount, 0);
  return earned - withdrawn;
};

router.get("/", (req, res) => {
  const result = authors.map(a => ({
    id: a.id,
    name: a.name,
    total_earnings: calculateEarnings(a.id),
    current_balance: currentBalance(a.id)
  }));
  res.json(result);
});

router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  const authorBooks = books.filter(b => b.authorId == author.id).map(book => {
    const sold = sales.filter(s => s.bookId === book.id)
      .reduce((a, b) => a + b.qty, 0);
    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty,
      total_sold: sold,
      total_royalty: sold * book.royalty
    };
  });

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_books: authorBooks.length,
    total_earnings: calculateEarnings(author.id),
    current_balance: currentBalance(author.id),
    books: authorBooks
  });
});

router.get("/:id/sales", (req, res) => {
  const authorBooks = books.filter(b => b.authorId == req.params.id);
  let allSales = [];

  authorBooks.forEach(book => {
    sales.filter(s => s.bookId === book.id).forEach(sale => {
      allSales.push({
        book_title: book.title,
        quantity: sale.qty,
        royalty_earned: sale.qty * book.royalty,
        sale_date: sale.date
      });
    });
  });

  allSales.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
  res.json(allSales);
});

router.get("/:id/withdrawals", (req, res) => {
  const data = withdrawals
    .filter(w => w.authorId == req.params.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(data);
});

module.exports = router;
