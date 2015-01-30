var discovery = require('bacon-discovery');
var EE = require('events').EventEmitter;
var zmq = require('zmq');

var server = zmq.socket('router');

module.exports = exports = function Kardashian(identity) {
  var ee = new EE();
  var rndServerPort = identity;// randomPort(); //TODO
  var server = createServer(rndServerPort);
  server.on('message', handleProtocol);

  return {
    start: start,
    on: ee.on.bind(ee)
  };

  function createServer(serverPort) {
    server.bindSync(serverPort);
    return server;
  }

  function discoveryNewPeer(peerAddress, peerPort) {
    ee.emit('newPeer', { address: peerAddress, port: peerPort });
    server.connect('tcp://' + peerAddress + ':' + peerPort);
  }

  function start() {
    discovery.start(rndServerPort, discoveryNewPeer);
  }

  function handleProtocol(envelope, msg) {
    if(msg === 'picPlz')
      return ee.emit('picPlz', {
        send: send ,
        picPlz: picPlz
    });

    console.log('invalid protocol');

    function send(image) {
      cydraServer.send(envelope, image);
    }
  }
};
