const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

// POST route
app.post('/register', (req, res) => {
  console.log('Inside /register route');

  const { name, email, phone } = req.body;
  console.log('Form data:', req.body); 

  const newData = { name, email, phone };
  const filePath = path.join(__dirname, 'data.json');

  let existingData = [];
  if (fs.existsSync(filePath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
      console.error('Failed to parse existing data.json');
    }
  }

  existingData.push(newData);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  res.redirect('/thankyou.html');
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
