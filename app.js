const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const materiRoutes = require('./routes/materiRoutes');
const mediaRoutes = require('./routes/media');
const siswaRoutes = require('./routes/siswa');
const setoranRoutes = require('./routes/setoran');
const itemSetoranRoutes = require('./routes/itemSetoran')
const latihanRoutes = require('./routes/latihan');
const penilaianRoutes = require('./routes/penilaian');
const penilaianSetoranRoutes = require('./routes/penilaian-setoran');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: ['http://localhost:5173','https://mabbar.web.id'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/api/auth', usersRouter);
app.use('/api/materi', materiRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/siswa', siswaRoutes);
app.use('/api/setoran', setoranRoutes);
app.use('/api/item-setoran', itemSetoranRoutes);
app.use('/api/latihan', latihanRoutes);
app.use('/api/penilaian', penilaianRoutes);
app.use('/api/penilaian-setoran', penilaianSetoranRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
