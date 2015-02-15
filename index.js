var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function () {
    // zoom == pixels per second if int
    // zoom == zoom if string (eg. 2x)
    return {
      buffer: null,
      width: 500,
      height: 100,
      zoom: 1
    };
  },
  componentDidMount: function () {
    var width = this.props.width * this.props.zoom;
    var middle = this.props.height / 2;

    var channelData = this.props.buffer.getChannelData(0);
    var step = Math.ceil(channelData.length / width);

    var ctx = this.refs.canvas.getDOMNode().getContext('2d');

    for (var i = 0; i < width; i += 1) {
      var min = 1.0;
      var max = -1.0;

      for (var j = 0; j < step; j += 1) {
        var datum = channelData[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }

    //ctx.fillStyle = 'green';
    //ctx.fillRect(10, 10, 100, 100);
  },
  draw: function () {
  },
  render: function () {
    return (
        <div className="waveform">
          <canvas
            ref="canvas"
            width={this.props.width * this.props.zoom}
            height={this.props.height}></canvas>
        </div>
        );
  }
});
