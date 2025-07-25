const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('✅ Welcome to SIT725 Task 2.2P Web Server');
});

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send('❌ Please use correct query like /add?num1=5&num2=7');
  }

  const sum = num1 + num2;
  res.send(`✅ The sum of ${num1} and ${num2} is ${sum}`);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send('❌ Please use correct query like /add?num1=5&num2=7');
  }

  const sum = num1 + num2;
  res.send(`✅ The sum of ${num1} and ${num2} is ${sum}`);
});
