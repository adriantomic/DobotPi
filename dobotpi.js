// https://www.bananarobotics.com/shop/How-to-use-the-HG7881-(L9110)-Dual-Channel-Motor-Driver-Module
// We recommend using input 1A to control the speed of each motor and input 1B to control the direction.

// http://blog.ricardofilipe.com/post/getting-started-arduino-johhny-five

var five = require("johnny-five");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var board = new five.Board();

// Web server stuff
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

server.listen(4000);

// Arduino
board.on("ready", function() {

  var IMUData;

  // Motors
  var motors = new five.Motors([
    { pins: { dir: 11, pwm: 10 }}, // Front  left
    //{ pins: { dir: 4, pwm: 5 }, invertPWM: true }, // Front right
    //{ pins: { dir: 4, pwm: 6 }, invertPWM: true }, // Rear left
    //{ pins: { dir: 4, pwm: 9 }, invertPWM: true }  // Rear right
  ]);

  // Add a MPU6050
  var gyro = new five.Gyro({
    controller: "MPU6050"
  });

  gyro.on("change", function() {
    IMUData = this;
    // console.log("gyro");
    // console.log("  x            : ", this.x);
    // console.log("  y            : ", this.y);
    // console.log("  z            : ", this.z);
    // console.log("  pitch        : ", this.pitch);
    // console.log("  roll         : ", this.roll);
    // console.log("  yaw          : ", this.yaw);
    // console.log("  rate         : ", this.rate);
    // console.log("  isCalibrated : ", this.isCalibrated);
    // console.log("--------------------------------------");
  });

  // Socket.io stuff
  io.on('connection', function(socket){
    console.log('Socket Connected: ' + socket.id);

    
    function emitIMUData() {
      io.emit('MPU6050', {
        IMUData: IMUData.pitch,
      });
    }
    setTimeout(emitIMUData, 500);
  });

  board.repl.inject({
    motors: motors
  });
});