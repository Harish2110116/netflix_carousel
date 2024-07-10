const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());

// Serve static files from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const items = [
  { id: 1, image: 'http://localhost:5000/images/1.png' },
  { id: 2, image: 'http://localhost:5000/images/2.png' },
  { id: 3, image: 'http://localhost:5000/images/3.png' },
  { id: 4, image: 'http://localhost:5000/images/4.png' },
  { id: 5, image: 'http://localhost:5000/images/5.png' },
  { id: 6, image: 'http://localhost:5000/images/6.png' },
  { id: 7, image: 'http://localhost:5000/images/7.png' },
  { id: 8, image: 'http://localhost:5000/images/8.png' },
  { id: 9, image: 'http://localhost:5000/images/9.png' },
  { id: 10, image: 'http://localhost:5000/images/10.png' }
];

app.get('/api/carousel', (req, res) => {
  const { page, pageSize } = req.query;
  const start = (page - 1) * pageSize;
  const end = start + parseInt(pageSize);
  const paginatedItems = items.slice(start, end);
  res.json({ items: paginatedItems, totalPages: Math.ceil(items.length / pageSize) });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
