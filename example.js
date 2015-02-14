var React = require('react');
var Waveform = require('./index');

var request = new XMLHttpRequest();
request.open('GET', 'HardaTider-Har&nu.mp3', true);
request.responseType = 'arraybuffer';

request.addEventListener('load', function () {
  var context = new (window.AudioContext || window.webkitAudioContext)();

  context.decodeAudioData(request.response, function (buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;

    React.render(
        <Waveform buffer={buffer} />,
        document.getElementById('waveform')
        );
  });
});

request.send();
