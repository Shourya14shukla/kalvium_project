const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const history = [];

app.get('/', (req, res) => {
  res.send('Welcome to the Math Server!');
});

app.get('/calculate/:operation/:num1/:num2', (req, res) => {
  const { operation, num1, num2 } = req.params;
  const result = performOperation(operation, parseFloat(num1), parseFloat(num2));

  history.push({ operation, num1, num2, result });
  if (history.length > 20) {
    history.shift(); 
  }

  res.send(`Result: ${result}`);
});

app.get('/history', (req, res) => {
  res.json(history);
});

function performOperation(operation, num1, num2) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      return num1 / num2;
    default:
      return 'Invalid operation';
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});