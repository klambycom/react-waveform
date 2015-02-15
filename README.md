# rect-waveform

> Generates waveform using Web Audio API.

<p align="center">
  <img src="https://raw.githubusercontent.com/klambycom/react-waveform/master/waveform.png">
</p>

## Props

* **buffer** AudioBuffer
* **width** Integer
* **height** Integer
* **zoom** Integer
* **color** String


## Example

```javascript
var React = require('react');
var Waveform = require('react-waveform');

var request = new XMLHttpRequest();
request.open('GET', 'HardaTider-Har&nu.mp3', true);
request.responseType = 'arraybuffer';

request.addEventListener('load', function () {
  var context = new (window.AudioContext || window.webkitAudioContext)();

  context.decodeAudioData(request.response, function (buffer) {
    React.render(
        <Waveform buffer={buffer} width={720} color="cadetblue" />,
        document.getElementById('waveform')
        );
  });
});

request.send();
```
