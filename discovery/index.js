var dgram = require('dgram');

var BROADCAST_PORT = 3000;

var sock = dgram.createSocket('udp4');
sock.bind(BROADCAST_PORT, function(err) {
  if(err) { console.error(err); }

  sock.setBroadcast(true);
  var bacon = new Buffer('bacon');
  sock.send(bacon, 0, bacon.length, BROADCAST_PORT, '192.168.1.255');
});



sock.on('error', function(err) {
  console.error(err);
  sock.close()
});

sock.on('message', function(msg, rinfo) {
  console.log(msg.toString());
  console.log(rinfo);
});
