
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/authors", require("./routes/authors"));
app.use("/withdrawals", require("./routes/withdrawals"));

app.get("/", (req, res) => {
  res.send("Author Royalty API is running");
});

app.listen(3000, () => console.log("Server running on port 3000"));
