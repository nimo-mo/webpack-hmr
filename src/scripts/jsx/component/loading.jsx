var React = require('react');
var Util = require('../../js/util');
var Spinner = require('../../js/lib/spin');

var Loading = React.createClass({

	getInitialState: function() {
		return {
			visible: false 
		};
	},

	componentDidMount: function() {
		var self = this;
		self.setup();

		// for jquery
		// $.ajaxSetup({
		// 	beforeSend: self.start,
		// 	complete: self.done
		// });

		// for zepto
		$.ajaxSettings.beforeSend = self.start;
		$.ajaxSettings.complete = self.done;

		// global export
		window.Loading = {
			setup: self.setup,
			start: self.start,
			done: self.done
		};
	},

	start: function () {
		this.setState({visible: true});
		Util.disableEvents();
	},

	done: function () {
		this.setState({visible: false});
		Util.enableEvents();
	},

	setup: function () {
		var self = this;
    new Spinner({
      fps: 30,            // Frames per second when using setTimeout()
      width: 3,           // The line thickness
      speed: 1.5,         // Rounds per second
      color: '#fff',      // #rgb or #rrggbb
      radius: 10,          // The radius of the inner circle
      length: 10,          // The length of each line
      corners: 10          // Roundness (0..1)
    }).spin(self.refs.spinner);
  },

	render: function() {
		return (
			<div ref="loading" className={"loading" + (this.state.visible ? " visible" : "")}>
				<div ref="spinner" className="spinner"></div>
				<div ref="spinner-text" className="spinner-text">正在处理,请稍候</div>
			</div>
		);
	}

});

module.exports = Loading;