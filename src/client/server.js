import express from "express";
import morgan from 'morgan';

const app = express();
const port = 3260;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/data', (req, res) => {
  res.json({ message: 'GET request received' });
});

app.post('/api/data', (req, res) => {
  res.json({ message: 'POST request received' });
});

app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `PUT request received for ID ${id}` });
});

app.use('/api/fetch', (req, res) => {
  res.json({ message: 'FETCH request received' });
});

app.get('/', (req, res) => {
  res.sendFile('login.html', { root: 'src/client' });
});

app.use(express.static("src/client"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
