const express = require("express")
const { Pool } = require("pg")

const app = express()
app.use(express.json())

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

app.get("/api/items", async (req, res) => {
  const result = await pool.query("SELECT * FROM items")
  res.json(result.rows)
})

app.post("/api/items", async (req, res) => {
  await pool.query(
    "INSERT INTO items(name) VALUES($1)",
    [req.body.name]
  )
  res.sendStatus(201)
})

app.delete("/api/items/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM items WHERE id=$1",
    [req.params.id]
  )
  res.sendStatus(204)
})

app.listen(3000, () => console.log("Backend running"))