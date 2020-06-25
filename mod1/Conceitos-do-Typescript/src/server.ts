import express from "express";

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const { name, email } = req.body;

  const user = {
    name,
    email,
  };

  return res.json(user);
});

app.listen(3333);
