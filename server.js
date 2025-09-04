const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); 

app.post('/register', (req, res) => {
  const { name, email, phone } = req.body;
  const filePath = path.join(__dirname, 'registrations.json');

  let data = [];
  if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath);
    data = JSON.parse(jsonData);
  }

  data.push({
    name,
    email,
    phone,
    registered_at: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.redirect('/index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
