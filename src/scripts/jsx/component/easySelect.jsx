var React = require('react');

var EasySelect = React.createClass({

	getInitialState: function() {
		return {
			options: [],
			value: '' 
		};
	},

	componentDidMount: function () {
		this.updateState(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.updateState(nextProps);
	},

	updateState: function(newProps) {
		this.setState({
			options: newProps.options,
			value: newProps.value
		});
	},

	onChange: function (e) {
		var value = e.target.value;
		this.setState({value: value});
	},

	getValue: function () {
		return this.state.value
	},

	render: function() {
		var self = this;
		var state = self.state;
		var props = self.props;
		return (
			<select
				{...props}
				value={state.value}>
				{
					state.options.map(function (option,index) {
						var valueKey = props.valueKey || 'value';
						var textKey = props.textKey || 'text';
						return <option key={index} value={option[valueKey]}>{option[textKey]}</option>
					})
				}
			</select>
		);
	}

});

module.exports = EasySelect;