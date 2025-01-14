const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('./storage');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./Public')); 
let data = readData();

if (!data.classes) {
  data.classes = [
    { id: 1, name: 'Йога', time: '10:00 - 11:00', maxParticipants: 15, currentParticipants: 10 },
    { id: 2, name: 'Силовая тренировка', time: '11:30 - 12:30', maxParticipants: 20, currentParticipants: 20 },
    { id: 3, name: 'Зумба', time: '13:00 - 14:00', maxParticipants: 25, currentParticipants: 18 },
  ];
  writeData(data);
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Public/index.html');
});


app.get('/api/classes', (req, res) => {
  res.json(data.classes);
});


app.post('/api/enroll', (req, res) => {
  const { classId } = req.body;
  const classItem = data.classes.find((c) => c.id === parseInt(classId));

  if (classItem && classItem.currentParticipants < classItem.maxParticipants) {
    classItem.currentParticipants++;
    writeData(data);
    return res.status(200).json({ success: true, classItem });
  }

  res.status(400).json({ success: false, message: 'Место отсутствует.' });
});


app.post('/api/cancel', (req, res) => {
  const { classId } = req.body;
  const classItem = data.classes.find((c) => c.id === parseInt(classId));

  if (classItem && classItem.currentParticipants > 0) {
    classItem.currentParticipants--;
    writeData(data);
    return res.status(200).json({ success: true, classItem });
  }

  res.status(400).json({ success: false, message: 'Нет записанных участников.' });
});

// 404
app.use((req, res) => {
  res.status(404).send('<h1>Страница не найдена!</h1>');
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
