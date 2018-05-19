//var file = '/dev/cu.usbserial';
//var file = '/dev/ttyUSB0';
//var file = '/dev/tty.usbserial';
var file = '/dev/tty.usbmodem1421';

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
  delimiter: '\r\n'
});

const port = new SerialPort(file, {
  baudRate: 4800
});

port.pipe(parser);

var GPS = require('gps');
var gps = new GPS;

gps.on('data', function(data) {
  //console.log(gps.state);
  if(data.lat != undefined && data.lon != undefined) {
    console.log(`Lat: ${data.lat} Lon: ${data.lon}`);
  }
});

parser.on('data', function(data) {
  gps.update(data);
});
