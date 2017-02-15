const net = require('net');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// 라우팅
var TCP =  require('./tcpServer');
const sensors = require('./routes/sensors');
const test = require('./routes/test');
const dashboard = require('./routes/dashboard');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const httpPort = 3000;

// 미들웨어
app.set('views',path.join(__dirname,'views/pages'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




TCP.on('data',function (data) {

  /*
  온도
  dataArray[0] = temp_01 , dataArray[1] = temp_01-battery , dataArray[2] = temp_02 , dataArray[3] = temp_02-battery ,
  dataArray[4] = temp_03 , dataArray[5] = temp_03-battery ,

  습도
  dataArray[6] = humi_01 , dataArray[7] = humi_01-battery , dataArray[8] = humi_02 , dataArray[9] = humi_02-battery ,

  조도
  dataArray[10] = lumi_01 , dataArray[11] = lumi_01-battery , dataArray[12] = lumi_02 , dataArray[13] = lumi_02-battery

  */
  var dataArray = data.split(',');
  io.emit('temp',dataArray[0],dataArray[1],dataArray[2],dataArray[3],dataArray[4],dataArray[5]);
  io.emit('humi',dataArray[6],dataArray[7],dataArray[8],dataArray[9]);
  io.emit('lumi',dataArray[10],dataArray[11],dataArray[12],dataArray[13]);
  io.emit('dashValue',dataArray);
  io.emit('dashBattery',dataArray);
})

app.use('/',dashboard);
app.use('/sensors',sensors);
app.use('/test',test);


http.listen(httpPort,function () {
  console.log('Server listening on port '+httpPort);
})


module.exports = app;
