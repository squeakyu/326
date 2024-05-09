import express from "express";
import morgan from 'morgan';


const app = express();
const port = 3260;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('login.html', { root: 'src/client' });
});

app.use(express.static("src/client"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
