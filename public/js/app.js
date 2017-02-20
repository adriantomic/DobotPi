(function() {
  var socket = io.connect(window.location.hostname + ':' + 4000);

  socket.on('connect', function(data) {
    socket.emit('join', 'Client is connected!');
  });

  socket.on('MPU6050', function(data) {
    console.log(data);
  });
}());