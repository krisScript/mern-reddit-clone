const path = require('path');
<<<<<<< HEAD

=======
>>>>>>> refactored user routes
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const communityRoutes = require('./routes/community')
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
<<<<<<< HEAD
const { mongoURI } = require('./config/keys');
const app = express();


=======
const  mongoURI  = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`
const app = express();

>>>>>>> refactored user routes
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/svg+xml'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/user',userRoutes)
app.use('/comment',commentRoutes)
app.use('/post',postRoutes)
app.use('/community',communityRoutes)
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const data = error.data;
  res.status(status).json({data: data });
});

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
