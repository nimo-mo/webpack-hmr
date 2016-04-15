var React = require('react');
var Api = require('../js/api');

var EasySelect = require('./component/easySelect');

var Demo = React.createClass({

	getInitialState: function() {
		return {
			value: 1,
			options: [{
				value: 1,
				text: 'text1' 
			},{
				value: 2,
				text: 'text2' 
			}] 
		};
	},

	componentDidMount: function() {
		// Api.get(null,null,{
		// 	// ajaxSettings first
		// 	url:'../statics/demo.json',
		// 	complete: function () {
		// 		setTimeout(Loading.done,3000)
		// 	}
		// })
		// .done(function (res) {
		// 	// console.log(res)
		// })
		// .fail(function (error) {
		// 	// body...
		// });
	},

	onChange: function (value) {
		console.log(value);
	},

	render: function() {
		var self = this;
		var state = self.state;
		return (
			<div>
				<EasySelect
					ref="demo"
					value={state.value}
					options={state.options}
					onChange={self.onChange} />
					<button onClick={Loading.start}>Loading.start</button>
					<button onClick={Loading.done}>Loading.done</button>
			</div>
		);
	}

});

module.exports = Demo;