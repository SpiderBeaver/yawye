import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(3000, () => console.log('YAWYE server started. Listening on port 3000.'));
