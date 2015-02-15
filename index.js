var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      buffer: null,
      width: 500,
      height: 100,
      zoom: 1,
      color: 'black'
    };
  },
  componentDidMount: function () {
    var width = this.props.width * this.props.zoom;
    var middle = this.props.height / 2;

    var channelData = this.props.buffer.getChannelData(0);
    var step = Math.ceil(channelData.length / width);

    var ctx = this.refs.canvas.getDOMNode().getContext('2d');
    ctx.fillStyle = this.props.color;
    this.draw(width, step, middle, channelData, ctx);
  },
  draw: function (width, step, middle, data, ctx) {
    for (var i = 0; i < width; i += 1) {
      var min = 1.0;
      var max = -1.0;

      for (var j = 0; j < step; j += 1) {
        var datum = data[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  },
  render: function () {
    return (
        <canvas
          ref="canvas"
          className="waveform"
          width={this.props.width * this.props.zoom}
          height={this.props.height}></canvas>
        );
  }
});
